//**************** imports ****************//
const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const {
	getChatMessages,
	sendChatMessage,
} = require('./../controllers/messageControllers');

//**************** variables ****************//
const router = express.Router();

//**************** message routes ****************//
router.route('/:chatId').get(protected, getChatMessages);
router.route('/').post(protected, sendChatMessage);

module.exports = router;
