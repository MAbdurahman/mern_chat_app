const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const { getAllMessages, sendMessage } = require('./../controllers/messageControllers');


const router = express.Router();





module.exports = router;