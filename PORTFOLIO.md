# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。從基本的待辦管理開始，逐步加入主題切換、篩選與批次清理，並以此專案練習 Agent Mode、MCP 與可重複使用的 agentic workflow。

## 線上展示

https://<你的帳號>.github.io/<你的repo名稱>/

## 功能

- 新增待辦事項，並阻止空白內容送出。
- 勾選或取消勾選待辦；完成項目會淡化並加上刪除線。
- 刪除單筆待辦，或在確認後一次清除所有已完成項目；沒有已完成項目時，清除按鈕會隱藏。
- 依「全部」、「未完成」、「已完成」篩選項目；篩選沒有結果時顯示相應提示，並說明資料仍保留。
- 顯示整份清單的未完成數量，不受目前篩選影響。
- 切換淺色與深色模式，保存手動選擇；尚未手動選擇時跟隨作業系統主題。
- 使用瀏覽器 localStorage 保存待辦資料，重新整理後仍可讀取。
- 置中卡片式介面，支援手機螢幕。

## 技術

- 使用 HTML、CSS 與原生 JavaScript 建置，沒有框架或外部套件。
- CSS 以自訂屬性管理色彩，並透過 RWD 規則調整手機版面。
- 待辦資料與手動選擇的主題保存在瀏覽器 localStorage。
- 不使用外部 CDN 或建置流程，可離線開啟 `index.html` 使用。

## 開發方式

- **GitHub Copilot Agent Mode：** 依工作坊步驟，先以需求提示建立基本 App，再透過多檔修改加入主題與篩選，並練習檢視變更和版本控制還原。
- **MCP：** 透過 `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server，讓 Copilot 能查詢官方文件並讀取 GitHub issue。
- **Agentic workflow：** `.github/copilot-instructions.md` 記錄專案限制與協作規則；`.github/prompts/fix-issue.prompt.md` 將 issue 修復流程整理成可重複執行的步驟，包含先提出計畫等待確認，再修改、驗證並建立 Pull Request。

## 我學到什麼

- 把需求、技術限制和驗收方式描述清楚，有助於 Agent 產出更符合預期的修改。
- 跨檔案功能需要一起檢查 HTML 結構、CSS 狀態和 JavaScript 行為。
- MCP 能讓 AI 在本機程式碼之外，取得文件與 issue 等工作脈絡。
- 把專案規則和重複工作流程寫成檔案，能讓協作方式更明確、可重複。
- 確認和版本控制是工作流程的一部分；修改後仍要驗證行為，並保留可回復的提交紀錄。