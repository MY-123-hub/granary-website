import { readFileSync, existsSync, statSync, createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
const releases = JSON.parse(
  readFileSync(new URL("../src/data/releases.json", import.meta.url), "utf8"),
);
const fail = (message) => {
  throw new Error(`发布配置校验失败：${message}`);
};
const versions = new Set();
if (!Array.isArray(releases) || !releases.length)
  fail("至少保留一个候选或正式版本");
let previousVersion;
for (const release of releases) {
  if (!/^\d+\.\d+\.\d+$/.test(release.version))
    fail("version 必须使用 x.y.z 格式");
  if (versions.has(release.version)) fail(`版本号重复：${release.version}`);
  versions.add(release.version);
  const parts = release.version.split(".").map(Number);
  if (previousVersion) {
    let comparison = 0;
    for (let i = 0; i < 3 && comparison === 0; i++)
      comparison = parts[i] - previousVersion[i];
    if (comparison >= 0) fail("版本须按语义版本号从新到旧排列");
  }
  previousVersion = parts;
  if (!["draft", "published"].includes(release.status))
    fail("status 只能是 draft 或 published");
  if (release.platform !== "windows" || release.architecture !== "x64")
    fail("当前仅支持 Windows x64");
  if (
    !Array.isArray(release.releaseNotes) ||
    !release.releaseNotes.length ||
    release.releaseNotes.some(
      (note) => typeof note !== "string" || !note.trim(),
    )
  )
    fail("releaseNotes 不可为空");
  if (release.sha256 != null && !/^[a-f0-9]{64}$/.test(release.sha256))
    fail("SHA-256 必须为 64 位小写十六进制");
  if (
    release.sizeBytes != null &&
    (!Number.isSafeInteger(release.sizeBytes) || release.sizeBytes <= 0)
  )
    fail("sizeBytes 必须是正整数");
  if (
    typeof release.fileName !== "string" ||
    !release.fileName.endsWith(".exe") ||
    /[/\\]/.test(release.fileName)
  )
    fail("fileName 必须是 exe 文件名");
  for (const key of ["preparedAt", "publishedAt"]) {
    const date = release[key];
    if (
      date != null &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date)
    )
      fail(`${key} 日期无效`);
  }
  if (
    release.status === "draft" &&
    (release.downloadUrl != null || release.publishedAt != null)
  )
    fail("草稿必须将 downloadUrl 和 publishedAt 设为 null");
  if (
    release.status === "published" &&
    (!release.downloadUrl ||
      !release.publishedAt ||
      !release.sha256 ||
      !release.sizeBytes)
  )
    fail(`正式版 ${release.version} 缺少下载地址、发布日期、校验值或大小`);
  if (release.downloadUrl) {
    if (
      !/^https:\/\//.test(release.downloadUrl) &&
      !/^\/downloads\/[^/]+\.exe$/.test(release.downloadUrl)
    )
      fail("下载地址只能是 HTTPS URL 或 /downloads/filename.exe");
    if (release.downloadUrl.startsWith("https://")) {
      const url = new URL(release.downloadUrl);
      if (url.username || url.password) fail("下载地址不得包含凭据");
    }
    if (release.downloadUrl.startsWith("/downloads/")) {
      const relative = decodeURIComponent(release.downloadUrl).slice(1);
      const file = resolve("public", relative);
      if (
        !file.startsWith(resolve("public/downloads") + "/") ||
        !existsSync(file)
      )
        fail("本地下载文件不存在或路径无效");
      if (statSync(file).size !== release.sizeBytes)
        fail("安装包大小与配置不一致");
      const hash = createHash("sha256");
      for await (const chunk of createReadStream(file)) hash.update(chunk);
      if (hash.digest("hex") !== release.sha256)
        fail("安装包校验值与配置不一致");
    }
  }
}
if (process.env.PUBLIC_SITE_URL) {
  const url = new URL(process.env.PUBLIC_SITE_URL);
  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    fail("PUBLIC_SITE_URL 必须是无凭据的 HTTPS 根地址");
}
console.log(
  `发布配置通过：${releases.length} 个版本；${releases.filter((release) => release.status === "published").length} 个公开版本。`,
);
