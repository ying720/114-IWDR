const express = require('express');
const path = require('path');
const app = express();
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
