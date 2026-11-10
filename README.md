# 昆明冬鸟手帐

昆明 11–4 月观鸟用的手机网页：半月日程（时间、路线、准备）、36 种鸟的图鉴、入门手册、日出日落和 8 天天气。

- 打开：https://icelos2027.github.io/kunming-birds/
- iPhone：用 Safari 打开 → 分享 → 添加到主屏幕。
- 记录（已见鸟种、去过的日程）只存在本机 localStorage，可在“我的”里导出 / 导入 JSON。
- 天气：页面直接请求 Open-Meteo，结果缓存在本机。

纯静态，无构建步骤：改 `index.html` 后推送到 `main`，GitHub Actions 自动发布。改了静态文件时把 `sw.js` 里的 `CACHE` 版本号加一。

## 来源与许可

- 鸟种照片：Wikimedia Commons，各自按 CC BY / CC BY-SA 许可使用，仅缩小尺寸。作者、许可和原图链接见 `photos.json` 与页面“我的 → 照片与字体来源”。
- 字体：霞鹜文楷 GB 屏幕阅读版（`lxgw-wenkai-screen-web` 拆分版），SIL OFL 1.1，见 `licenses/`。
- 天气数据：Open-Meteo，CC BY 4.0。
