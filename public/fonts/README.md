# 网站字体

`noto-sans-sc-website.woff2`：Noto Sans SC，400–600 可变字重，中英文使用同一字体。来自 Google Fonts 官方 CSS API，按当前 `src/` 中的中文、标点与 ASCII 裁剪，页面不请求第三方字体服务。SIL Open Font License 1.1 允许商业使用及随网站分发，授权原文保留在 `OFL.txt`。

来源：https://github.com/google/fonts/tree/main/ofl/notosanssc

新增文案中的缺失字符会自动回退到系统中文字体。需要统一新增字符时，可使用 Google Fonts CSS API 的 `family=Noto Sans SC:wght@400..600` 和 `text` 参数，包含全部官网字符后重新下载其 WOFF2 文件，替换同名资产；保留授权文件。更新字体后检查桌面与手机的换行。
