import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from './context/chatContext';

import './styles/global-styles.css';
import App from './app/App';

ReactDOM.render(
	<BrowserRouter>
		<ChakraProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</ChakraProvider>
	</BrowserRouter>,

	document.getElementById('root')
);
