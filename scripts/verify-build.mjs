import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";
const releases = JSON.parse(readFileSync("src/data/releases.json", "utf8"));
const published = releases.find((release) => release.status === "published");
const base = (process.env.PUBLIC_BASE_PATH || "/").replace(/\/$/, "");
const deployedUrl = (url) => (url?.startsWith("/") ? `${base}${url}` : url);
const latest = JSON.parse(readFileSync("dist/update/latest.json", "utf8"));
assert.equal(latest.available, Boolean(published));
assert.equal(latest.version, published?.version ?? null);
assert.equal(latest.downloadUrl, deployedUrl(published?.downloadUrl) ?? null);
assert.equal(latest.sha256, published?.sha256 ?? null);
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(directory, entry.name))
      : [join(directory, entry.name)],
  );
}
const files = walk("dist");
const htmlFiles = files.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  assert.match(html, /<html lang="zh-CN">/, `${file} 缺少语言`);
  assert.match(html, /name="description"/, `${file} 缺少 description`);
  assert.match(html, /<h1[ >]/, `${file} 缺少主标题`);
  for (const [, raw] of html.matchAll(
    /(?:href|src|data-image-open)="(\/[^"#?]*)/g,
  )) {
    assert.ok(
      !base || raw.startsWith(`${base}/`),
      `${file} 缺少部署路径前缀：${raw}`,
    );
    const relative = raw.slice(base.length);
    const path = resolve("dist", decodeURIComponent(relative).slice(1));
    assert.ok(
      existsSync(path) || existsSync(join(path, "index.html")),
      `${file} 存在失效链接：${raw}`,
    );
  }
}
for (const file of files.filter((file) => file.endsWith(".css"))) {
  for (const [, raw] of readFileSync(file, "utf8").matchAll(
    /url\(["']?(\/[^)'"?#]+)/g,
  )) {
    assert.ok(
      !base || raw.startsWith(`${base}/`),
      `${file} 静态资源缺少部署路径：${raw}`,
    );
    assert.ok(
      existsSync(resolve("dist", raw.slice(base.length + 1))),
      `${file} 资源不存在：${raw}`,
    );
  }
}
assert.ok(
  !files.some((file) => /(?:issuer|\.lic$|\.jar$|\.env)/i.test(file)),
  "产物不应包含授权或后端文件",
);
console.log(
  `静态产物通过：${htmlFiles.length} 个 HTML 页面；内部链接有效；更新 JSON 与公开版本一致。`,
);
