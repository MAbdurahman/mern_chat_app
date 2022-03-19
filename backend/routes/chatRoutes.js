const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const {
	accessChat,
	addToGroup,
	createGroupChat,
	fetchChats,
	removeFromGroup,
	renameGroup,
} = require('./../controllers/chatControllers');

//**************** variable ****************//
const router = express.Router();

//**************** chat routes ****************//
router.route('/').post(protected, accessChat);
router.route('/').get(protected, fetchChats);
router.route('/create-group').post(protected, createGroupChat);
router.route('/rename-group').put(protected, renameGroup);
router.route('/remove-from-group').put(protected, removeFromGroup);
router.route('/add-to-group').put(protected, addToGroup);


module.exports = router;