// router.js
const express = require('express');
const router = express.Router();
const { addOrder } = require('./insert');

// 前端頁面路由
router.get('/', (req, res) => res.render('test', { title: '開頭動畫' }));
router.get('/homepage', (req, res) => res.render('homepage', { title: '首頁' }));
router.get('/menu', (req, res) => res.render('menu', { title: '菜單' }));
router.get('/order', (req, res) => res.render('order', { title: '訂購' }));
router.get('/storepage', (req, res) => res.render('storepage', { title: '門市資訊' }));
router.get('/brandstory', (req, res) => res.render('brandStory', { title: '品牌故事' }));
router.get('/frequentlyaskedquestions', (req, res) => res.render('frequentlyaskedquestions', { title: '常見問題' }));

// API: 新增訂單
router.post('/api/order', async (req, res) => {
  const { customer_name, phone, pickup_method, cart } = req.body;

  if (!customer_name || !phone || !pickup_method || !cart || !cart.length) {
    return res.status(400).json({ error: '資料不完整' });
  }

  try {
    const order_id = await addOrder(customer_name, phone, pickup_method, cart);
    res.json({ message: '訂單新增成功', order_id });
  } catch (err) {
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

module.exports = router;
