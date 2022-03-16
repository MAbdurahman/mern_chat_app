const asyncHandler = require('express-async-handler');
const Chat = require('./../models/chatModel');
const User = require('./../models/userModel');

/*=========================================================
   (one on one chats) AccessChats(POST) -> api/v1/chats
============================================================*/
const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('UserId param not sent with request');
		return res.sendStatus(400);
	}

	let isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate('users', '-password')
		.populate('latestMessage');

	isChat = await User.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'name pic email',
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);
			const FullChat = await Chat.findOne({
				_id: createdChat._id,
			}).populate('users', '-password');
			res.status(200).json(FullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

/*============================================================
   (all chats of user)FetchChats(GET) -> api/v1/chats
===============================================================*/
const fetchChats = asyncHandler(async (req, res) => {
	try {
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate('users', '-password')
			.populate('groupAdmin', '-password')
			.populate('latestMessage')
			.sort({ updatedAt: -1 })
			.then(async results => {
				results = await User.populate(results, {
					path: 'latestMessage.sender',
					select: 'name pic email',
				});
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

/*========================================================================
   (add user to group)AddToGroup(PUT) -> api/v1/chats/add-to-group
===========================================================================*/
const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	//**************** if requester is admin ****************//
	const addedToGroup = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!addedToGroup) {
		res.status(404);
		throw new Error('Chat Group Not Found!');
	} else {
		res.json(addedToGroup);
	}
});

/*=================================================================================
   (create new group chat)CreateGroupChat(POST) -> api/v1/chats/create-group
====================================================================================*/
const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({ message: 'Enter Values For All Fields!' });
	}

	var users = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res
			.status(400)
			.send('Three Or More Users Are Required To Form A Group Chat!');
	}

	users.push(req.user);

	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

/*=======================================================================================
   (remove user from group)RemoveFromGroup(PUT) -> api/v1/chats/remove-from-group
==========================================================================================*/
const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	//**************** if requester is admin ****************//
	const removeFromGroup = await Chat.findByIdAndUpdate(
		chatId,
		{
			$pull: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!removeFromGroup) {
		res.status(404);
		throw new Error('Chat Group Not Found!');
	} else {
		res.json(removeFromGroup);
	}
	
});

/*========================================================================
   (rename group chat)RenameGroup(PUT) -> api/v1/chats/rename-group
===========================================================================*/
const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName: chatName,
		},
		{
			new: true,
		}
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!updatedChat) {
		res.status(404);
		throw new Error('Chat Group Not Found!');
	} else {
		res.json(updatedChat);
	}
});

module.exports = {
	accessChat,
	addToGroup,
	createGroupChat,
	fetchChats,
	removeFromGroup,
	renameGroup,
};
