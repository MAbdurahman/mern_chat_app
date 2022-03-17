import React, { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { ChatState } from './../context/chatContext';
import ChatLoading from './ChatLoading';

export default function MyChats({ fetchAgain }) {
	//**************** variables ****************//
	const [loggedUser, setLoggedUser] = useState();
	const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
	const toast = useToast();

	//**************** functions ****************//
	const fetchChats = async () => {
		
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get('/api/v1/chats', config);
			setChats(data);

		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: 'Failed To Load The Chats!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
		fetchChats();
		// eslint-disable-next-line
	}, [fetchAgain]);

	return <div>MyChats</div>;
}
