const express = require('express');
const { loginController, createUserController } = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/create', createUserController);
router.post('/login', loginController);

module.exports = router;
