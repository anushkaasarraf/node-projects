const express = require('express');
const router = express.Router();
const { handleUserRequest } = require('../controllers/user');
const { handleUserLogin } = require('../controllers/user');

router.post('/', handleUserRequest);
router.post('/login', handleUserLogin);

module.exports = router;