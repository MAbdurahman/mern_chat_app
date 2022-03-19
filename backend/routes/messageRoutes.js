//**************** imports ****************//
const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const {
	getAllMessages,
	sendMessage,
} = require('./../controllers/messageControllers');

//**************** variables ****************//
const router = express.Router();

//**************** message routes ****************//
router.route('/:chatId').get(protected, getAllMessages);
router.route('/').post(protected, sendMessage);

module.exports = router;
