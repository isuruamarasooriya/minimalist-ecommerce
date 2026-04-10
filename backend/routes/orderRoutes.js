const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    createPaymentIntent,
    getOrders,
    updateOrderToDelivered
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.post('/:id/pay-stripe', protect, createPaymentIntent);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;