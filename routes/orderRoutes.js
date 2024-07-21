const express = require('express');
const { getAllOrders, getOrderById, createOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);

module.exports = router;
