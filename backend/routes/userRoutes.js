const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    updateUserProfile, 
    getUsers, 
    deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;