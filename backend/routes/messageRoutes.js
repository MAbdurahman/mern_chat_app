//**************** imports ****************//
const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const {
	getUserMessages,
	sendUserMessage,
} = require('./../controllers/messageControllers');

//**************** variables ****************//
const router = express.Router();

//**************** message routes ****************//
router.route('/:chatId').get(protected, getUserMessages);
router.route('/').post(protected, sendUserMessage);

module.exports = router;
