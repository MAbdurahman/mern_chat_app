//**************** imports ****************//
const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDatabase = require('./config/databaseConfig');

//**************** configuration setup ****************//
dotenv.config({ path: 'backend/config/config.env' });
colors.enable();
//**************** variables ****************//
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//**************** connect to database ****************//
connectDatabase();

//**************** app listening ****************//
const server = app.listen(PORT, () => {
	console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
			.yellow
	);
});

/*==================================================================
         Socket Implementation
=====================================================================*/
const io = require('socket.io')(server, {
	pingTimout: 60000,
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', socket => {
	console.log(`Server connected to socket.io`.green.italic);
	socket.on('setup', userData => {
		socket.join(userData._id);
		socket.emit('connected');
	});

	socket.on('join chat', room => {
		socket.join(room);
		console.log('User Joined Room: ' + room);
	});

	socket.on('typing', room => socket.in(room).emit('typing'));
	socket.on('stop typing', room => socket.in(room).emit('stop typing'));

	socket.on('new message', newMessageReceived => {
		let chat = newMessageReceived.chat;

		if (!chat.users) return console.log('chat.users not defined');

		chat.users.forEach(user => {
			if (user._id == newMessageReceived.sender._id) return;

			socket.in(user._id).emit('message received', newMessageReceived);
		});
	});

	socket.off('setup', () => {
		console.log(`User disconnected`.cyan.italic);
		socket.leave(userData._id);
	});

});
