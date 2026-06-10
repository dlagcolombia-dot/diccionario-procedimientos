const express = require('express');
const AuthController = require('../controllers/authController');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/verify', requireAuth, AuthController.verify);

module.exports = router;
