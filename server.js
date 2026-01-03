// 引入 Express 套件(用於建立伺服器)
const express = require('express');
// 引入 Node.js 內建的 path 模組(處理路徑)
const path = require('path');
// 建立一個 Express 應用程式實體(之後所有設定都會寫在 app 裡)
const app = express();
// 設定伺服器要監聽的埠號（Port）
const port = 3000;

// 解析 JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 設定 EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 靜態檔案
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由
const routes = require('./router');
app.use('/', routes);  // 所有路由交給 router.js 管理

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器已啟動！請訪問 http://localhost:${port}`);
});
