import { createReadStream, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { basename } from "node:path";
const file = process.argv[2];
if (!file) {
  console.error("用法：npm run release:inspect -- /absolute/path/Setup.exe");
  process.exit(1);
}
const sha = createHash("sha256");
for await (const chunk of createReadStream(file)) sha.update(chunk);
console.log(
  JSON.stringify(
    {
      fileName: basename(file),
      sizeBytes: statSync(file).size,
      sha256: sha.digest("hex"),
    },
    null,
    2,
  ),
);
