const express = require('express');
const {
	accessChat,
	addToGroup,
	createGroupChat,
	fetchChats,
	removeFromGroup,
	renameGroup,
} = require('./../controllers/chatControllers');
const { protected } = require('./../middlewares/authMiddleware');

//**************** variable ****************//
const router = express.Router();

//**************** chat routes ****************//
router.route('/').post(protected, accessChat);
router.route('/').get(protected, fetchChats);
router.route('/creategroup').post(protected, createGroupChat);
router.route('/renamegroup').put(protected, renameGroup);
router.route('/removegroup').put(protected, removeFromGroup);
router.route('/addtogroup').put(protected, addToGroup);


module.exports = router;