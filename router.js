// router.js
// 引入 Express 套件
const express = require('express');
// 使用 Express 的 Router (建立可模組化的路由)
const router = express.Router();
// 從 insert.js 引入新增訂單的函式 addOrder (負責把訂單資料寫進資料庫)
const { addOrder } = require('./insert');

//--------------------------------
// 前端頁面路由（GET）

// 開頭動畫頁面
router.get('/', (req, res) => res.render('test', { title: '開頭動畫' }));
// 進入首頁
router.get('/homepage', (req, res) => res.render('homepage', { title: '首頁' }));
// 菜單頁面
router.get('/menu', (req, res) => res.render('menu', { title: '菜單' }));
// 訂購頁面
router.get('/order', (req, res) => res.render('order', { title: '訂購' }));
// 門市資訊頁面
router.get('/storepage', (req, res) => res.render('storepage', { title: '門市資訊' }));
// 品牌故事頁面
router.get('/brandstory', (req, res) => res.render('brandStory', { title: '品牌故事' }));
// 常見問題頁面
router.get('/frequentlyaskedquestions', (req, res) => res.render('frequentlyaskedquestions', { title: '常見問題' }));

//--------------------------------
// API：新增訂單（POST）

// 當前端送出訂單資料到 /api/order 時會進入這裡
router.post('/api/order', async (req, res) => {
  // 從前端送來的 req.body 中取出訂單資料
  const { customer_name, phone, pickup_method, cart } = req.body;

  // 檢查資料是否完整
  // 如果有任何一個欄位是空的，或購物車沒有商品，就回傳 400 錯誤（使用者送來的資料有問題）。
  if (!customer_name || !phone || !pickup_method || !cart || !cart.length) {
    return res.status(400).json({ error: '資料不完整' });
  }

  try {
    // 呼叫 addOrder 函式，將訂單寫入資料庫
    // await 表示要等資料庫完成後才繼續執行
    const order_id = await addOrder(customer_name, phone, pickup_method, cart);
    // 成功後回傳 JSON 給前端
    res.json({ message: '訂單新增成功', order_id });
  } catch (err) {
    // 如果新增訂單時發生錯誤，會進入這裡。
    console.error("新增訂單失敗(完整錯誤)：", err);

    // 除錯用：把 MySQL/程式錯誤回傳給前端（之後上線再改回簡短訊息）
    res.status(500).json({
      error: '新增訂單失敗',
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      message: err.message
    });
  }
});

// 將 router 匯出，讓 server.js 可以使用。
module.exports = router;
