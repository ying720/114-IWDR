const db = require('./db');

// 查詢所有訂單
async function getOrders() {
    const sql = "SELECT * FROM `order`";
    try {
        const [rows] = await db.query(sql);
        console.log("Orders:", rows);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// 查詢某筆訂單的明細
async function getOrderItems(orderId) {
    const sql = "SELECT * FROM `order_items` WHERE `order_id` = ?";
    try {
        const [rows] = await db.query(sql, [orderId]);
        console.log(`Order ${orderId} items:`, rows);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { getOrders, getOrderItems };
