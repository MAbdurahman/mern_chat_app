import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';

export default function App() {
	return (
		<div className='app'>
			<Switch>
				<Route path='/' component={HomePage} exact />
				<Route path='/chats' component={ChatPage} exact />
			</Switch>
		</div>
	);
}
