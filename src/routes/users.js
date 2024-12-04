const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const userController = require('../controllers/userController')
const handleRequest = require('../utils/handleRequest');
const messages = require('../lang/messages')


// Register user route using handleRequest
router.post('/register', (req, res) => {
    handleRequest(req, res, userController.registerUser, messages.success.userRegistered);
  });

// Get user by id
router.get('/users/:id',authMiddleware, (req, res) => {
    handleRequest(req, res, userController.getUserById, messages.success.dataFetched);
  });

// Get all users
router.get('/users',authMiddleware, (req, res) => {
    handleRequest(req, res, userController.findAll, messages.success.dataFetched);
  });


// Get sensetive data
router.get('/users/sdata/:id',authMiddleware, (req, res) => {
    handleRequest(req, res, userController.getSensetiveData, messages.success.dataFetched);
  });




module.exports = router;
