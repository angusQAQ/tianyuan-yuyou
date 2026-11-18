# 專案工作規範

## 工作位置與文件

- 在此雲端工作區的既有倉庫內進行後續更新；除非使用者要求，無需建立 Git worktree。
- 修改前閱讀 `README.md`，並依工作範圍參照 `art/IDENTITY.md`、`art/HUB_PORTRAIT_ZONES.md`、`art/STORY_INDEX.md` 及 `art/STORY_INDEX_R32_PARTIAL.md`。
- 遊戲文案使用繁體中文及香港書面語，內容適合香港小學二年級。

## 提交與同步

- 每次完成更新，執行適合該變更的驗證，並建立有清楚說明的 git commit。
- 將完成的 commit 推送至 `angusQAQ/tianyuan-yuyou` 的 `main`，以同步 GitHub 及 GitHub Pages 永久網站：<https://angusqaq.github.io/tianyuan-yuyou/>。
- 推送前確認遠端狀態，保留他人的變更；不要強制推送或覆寫歷史。
- 網頁更新後確認 Pages 部署結果及線上內容。推送成功不等於網站部署成功；若權限、網路或部署失敗阻擋驗證，明確報告已完成及未完成的步驟。
- 完成回報應包含 commit 識別碼、驗證結果、推送及網站部署狀態。
- 不要提交憑證、暫存測試產物或與更新無關的檔案。

## 開發驗證

- 專案為靜態 HTML／CSS／JavaScript 遊戲，沒有套件安裝或建置步驟。
- 可在倉庫根目錄執行 `python3 -m http.server 8000 --bind 0.0.0.0` 啟動本地伺服器。
- JavaScript 修改需檢查語法，並在瀏覽器驗證受影響的互動；版面修改需檢查桌面及手機尺寸。
- 瀏覽器透過 `https://unpkg.com/three@0.160.0/build/three.module.js` 載入 Three.js，需要該網域的網路存取。
