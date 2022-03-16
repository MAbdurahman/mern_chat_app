const asyncHandler = require('express-async-handler');
const Chat = require('./../models/chatModel');
const User = require('./../models/userModel');

/*=============================================
         AccessChats
================================================*/
const accessChat = asyncHandler(async (req, res) => {
	console.log('access chat');
});

/*=============================================
         FetchChats
================================================*/
const fetchChats = asyncHandler(async (req, res) => {
	console.log('fetch chats');
});

/*=============================================
         AddToGroup
================================================*/
const addToGroup = asyncHandler(async (req, res) => {
	console.log('add to group');
});

/*=============================================
         CreateGroupChat
================================================*/
const createGroupChat = asyncHandler(async (req, res) => {
	console.log('create group chat');
});

/*=============================================
         RemoveFromGroup
================================================*/
const removeFromGroup = asyncHandler(async (req, res) => {
	console.log('remove from group');
});

/*=============================================
         RenameGroup
================================================*/
const renameGroup = asyncHandler(async (req, res) => {
	console.log('rename group');
});

module.exports = {
	accessChat,
	addToGroup,
	createGroupChat,
	fetchChats,
	removeFromGroup,
	renameGroup,
};
