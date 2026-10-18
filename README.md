# 統測高職資訊科（資電類）專一與專二線上測驗系統

專為技術型高中（高職）**電機與電子群資電類（資訊科、電子科）** 設計的 108 課綱統測線上模擬測驗網頁。支援 **專業科目(一)** 與 **專業科目(二)** 分開獨立測驗、自動計分與成效分析、歷次成績紀錄（LocalStorage 保存）、錯題本專攻複習，以及完整的題目考點詳細解析！

本專案採用**純前端架構（Vanilla HTML5 + CSS3 + JavaScript）**，無需安裝 Node.js 或架設後端資料庫，可直接免費託管於 **GitHub Pages** 或在電腦本機直接點開使用。

---

## 🌟 核心特色

1. **分科獨立考試**：
   - ⚡ **專業科目(一)**：基本電學、基本電學實習、電子學、電子學實習。
   - 💻 **專業科目(二)**：微處理機、數位邏輯設計、程式設計實習（C 語言）。
2. **多種測驗模式**：
   - **正式模擬考模式**：自訂考試時間（如 60 分鐘）與題數，交卷後自動批改公佈成績。
   - **刷題練習模式**：不限時間，每作答一題可隨時展開查看詳細破題步驟。
   - **🎯 錯題本重練**：系統自動收集過往答錯或未作答題目，供考前集中衝刺。
3. **分數統計與深度詳解**：
   - 考後即時計算得分（100分制）、正確率、各章節掌握度分析。
   - 篩選器切換「全部題目」、「僅看錯題」、「僅看答對」。
   - 每一題皆附上詳細解題推導、公式公式代入與核心考點觀念。
4. **歷次成績保存與匯入/匯出**：
   - 使用瀏覽器 `localStorage` 永久保存歷次考試分數、答對率與做題時間。
   - 支援將成績紀錄匯出為 JSON 備份檔，或匯入至其他裝置。
5. **友善現代化界面**：
   - 支援 **☀️ 淺色 / 🌙 深色模式** 一鍵切換。
   - 答題卡進度導航、標記複查（☆/★）防漏答機制。
   - RWD 響應式排版，手機、平板、電腦皆可順暢作答。

---

## 🚀 部署到 GitHub Pages 教學 (3 分鐘快速上線)

本專案不需要任何編譯打包步驟（Zero-build），只要將檔案推送到 GitHub 倉庫即可一鍵發布：

### 步驟 1：在 GitHub 建立新 Repository
1. 登入您的 [GitHub](https://github.com/) 帳號。
2. 點擊右上角「**+**」➔「**New repository**」。
3. 倉庫名稱（Repository name）可輸入如：`vocational-cs-exam`。
4. 選擇 **Public**（公開），點擊「**Create repository**」。

### 步驟 2：將專案檔案推送至 GitHub
在專案資料夾內打開終端機（PowerShell 或 Git Bash），依序執行以下指令：

```bash
# 初始化 Git 倉庫
git init

# 加入所有檔案
git add .

# 提交變更
git commit -m "feat: 初版高職資訊科專一專二測驗系統"

# 切換為主分支
git branch -M main

# 關聯您的遠端倉庫 (請將下方網址替換為您的 GitHub 倉庫網址)
git remote add origin https://github.com/<您的GitHub帳號>/vocational-cs-exam.git

# 推送至 GitHub
git push -u origin main
```

### 步驟 3：開啟 GitHub Pages
1. 在 GitHub 倉庫頁面，點選上方的「**Settings**（設定）」。
2. 在左側選單點選「**Pages**」。
3. 在 **Build and deployment** 區塊：
   - **Source** 選擇 `Deploy from a branch`。
   - **Branch** 選擇 `main`，資料夾選擇 `/ (root)`。
   - 點擊「**Save**」。
4. 稍等 1～2 分鐘後重新整理頁面，上方就會出現您的專屬網址：
   `https://<您的GitHub帳號>.github.io/vocational-cs-exam/`
5. 將此網址分享給同學或學生，即可隨時隨地上線刷題！

---

## 💻 本機直接執行方式

若不想上傳，也可以在電腦本機直接使用：
- **方式一**：直接在檔案總管中對 `index.html` 按兩下，直接以 Chrome / Edge / Firefox 等瀏覽器開啟即可！
- **方式二**：使用 VS Code 的 `Live Server` 外掛程式，或在終端機執行 `python -m http.server 8000` 後開啟 `http://localhost:8000`。

---

## 📝 如何新增或修改題庫？

所有題庫均放在 `questions.js` 檔案中，格式簡潔直覺。您可以隨時新增自訂題目：

```javascript
{
  id: "s2-015",                    // 題目唯一編號 (專一建議以 s1- 開頭，專二以 s2- 開頭)
  subject: "subject2",             // 科目代碼："subject1"(專一) 或 "subject2"(專二)
  category: "程式設計實習",          // 考科細項分類 (如：基本電學、電子學、微處理機、數位邏輯設計、程式設計實習)
  question: "執行下列 C 語言程式碼後輸出結果為何？\n```c\nprintf(\"Hello, World!\");\n```", // 支援 ```c 程式碼區塊排版
  options: [
    "選項 A 內容",
    "選項 B 內容",
    "選項 C 內容",
    "選項 D 內容"
  ],
  answer: 1,                       // 正確答案索引：0 代表 (A), 1 代表 (B), 2 代表 (C), 3 代表 (D)
  explanation: "【考點：基礎 C 語言語法】\n詳細解題步驟與觀念補充..." // 詳細解析內容 (支援換行與公式)
}
```

---

## 📂 檔案目錄結構

```text
vocational-cs-exam/
├── index.html       # 網頁主要結構 (含題頭、作答介面、成績結算、歷史紀錄彈窗)
├── styles.css       # 現代化響應式外觀樣式、深色模式主題
├── app.js           # 測驗計時、答案計分、答題卡、LocalStorage 本地儲存與邏輯處理
├── questions.js     # 108 課綱統測資電類專一與專二精選題庫及詳細破題步驟
└── README.md        # 專案說明與 GitHub Pages 部署教學
```

---

## 📄 授權條款 (License)
本專案採用 [MIT License](https://opensource.org/licenses/MIT) 開源授權，歡迎教育工作者、高職師生自由複製、教學演練或擴充題庫！
