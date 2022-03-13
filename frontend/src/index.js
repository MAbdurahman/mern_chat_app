import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
// import ChatProvider from './Context/ChatProvider';

import './styles/global-styles.css';
import App from './app/App';

ReactDOM.render(
	<ChakraProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>,
	document.getElementById('root')
);
