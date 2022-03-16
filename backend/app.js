//**************** imports ****************//
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const {
	errorHandlerMiddleware,
	notFoundMiddleware,
} = require('./middlewares/errorHandlerMiddleware');

//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION')
	require('dotenv').config({ path: 'backend/config/config.env' });
colors.enable();
//**************** variables ****************//
const app = express();

//**************** middleware****************//
if (process.env.NODE_ENV !== 'PRODUCTION') {
	app.use(morgan('dev'));
}
app.use(express.json());

//**************** import all routes ****************//
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
//**************** app routes ****************//
app.get('/api/v1/', (req, res) => {
	res.send('Welcome to Chit-Chat!');
}); 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chats', chatRoutes);

//**************** handle errors middleware ****************//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
