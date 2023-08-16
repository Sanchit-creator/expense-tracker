const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const userController = require('../controllers/user_controllers')

router.post('/register-user', userController.signUp)
router.post('/login', userController.signIn)
router.post('/upload/:id', protect, userController.post)
router.post('/delete/:id', protect, userController.destroy)
router.get('/products/:id', protect, userController.get)
router.get('/single/:id', protect, userController.getSingle)
router.patch('/update/:id', protect, userController.edit)

module.exports = router;