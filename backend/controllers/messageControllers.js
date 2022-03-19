const asyncHandler = require('express-async-handler');
const message = require('./../models/messageModel');
const chat = require('./../models/chatModel');
const user = require('./../models/userModel');


/*============================================================
      getAllMessages(GET) -> /api/v1/messages/:chatId
===============================================================*/
const getAllMessages = asyncHandler( async(req, res) => {
   console.log('getAllMessages')
})









/*=========================================================
      sendMessage(POST) -> /api/v1/messages/
============================================================*/
const sendMessage = asyncHandler( async(req, res) => {
   console.log('sendMessage')
})

module.exports = { getAllMessages, sendMessage };