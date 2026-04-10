const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getProducts);
router.post('/add', protect, admin, upload.single('image'), addProduct);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createProductReview);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;