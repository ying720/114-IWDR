// 引入 Express 套件(用於建立伺服器)
const express = require('express');
// 引入 Node.js 內建的 path 模組(處理路徑)
const path = require('path');
// 建立一個 Express 應用程式實體(之後所有設定都會寫在 app 裡)
const app = express();
// 設定伺服器要監聽的埠號（Port）
const port = 3000;

//---- 中介軟體(Middleware)設定 ----//

// 解析前端送來的 JSON 格式資料
app.use(express.json());

// 解析表單送出的資料
app.use(express.urlencoded({ extended: true }));


//----樣板引擎設定（EJS） ----//

// 設定使用 EJS 當作樣板引擎
// 可以在 HTML 中使用 JavaScript 語法來動態產生內容
app.set('view engine', 'ejs');

// 設定 EJS 樣板檔案的資料夾位置
app.set('views', path.join(__dirname, 'views'));

//---- 靜態檔案設定 ----//

//設定 public 資料夾為靜態資源目錄
app.use(express.static(path.join(__dirname, 'public')));

//---- 路由設定 ----//

// 引入 router.js，將所有路由集中管理，讓 server.js 更乾淨
const routes = require('./router');

// 所有路由交給 router.js 管理
app.use('/', routes);  

//---- 啟動伺服器 ----//

// 啟動伺服器並監聽指定的 Port
app.listen(port, () => {
  console.log(`伺服器已啟動！請訪問 http://localhost:${port}`);
});
