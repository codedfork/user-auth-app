const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const handleRequest = require('../utils/handleRequest');
const messages = require('../lang/messages');

//Authenticating user and returning auth token 
router.post('/login', (req, res) => {
    handleRequest(req, res, userController.login, messages.success.loginSuccessful)
});

module.exports = router;
