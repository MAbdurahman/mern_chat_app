//**************** imports ****************//
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');

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

//**************** app routes ****************//
app.get('/api', (req, res) => {
	res.send('Welcome to Chit-Chat!');
});
app.get('/api/chat', (req, res) => {
	res.send('Chat Page')
})
app.get('/api/chat/:id', (req, res) => {
	res.send(`Welcome user - ${req.params.id}`)
})

//**************** handle errors middleware ****************//

module.exports = app;
