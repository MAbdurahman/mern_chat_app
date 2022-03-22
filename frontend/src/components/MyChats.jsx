import React, { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { Button } from '@chakra-ui/react/';
import ReactTooltip from 'react-tooltip';
import { ChatState } from './../context/chatContext';
import { getSender } from '../config/chatLogicsConfig';
import ChatLoading from './ChatLoading';
import GroupChatModal from '../modals/GroupChatModal';

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

	return (
		<Box
			d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
			flexDir='column'
			alignItems='center'
			p={3}
			bg='white'
			w={{ base: '100%', md: '31%' }}
			borderRadius='lg'
			borderWidth='1px'
		>
			<Box
				pb={3}
				px={3}
				fontSize={{ base: '28px', md: '30px' }}
				fontFamily='Montserrat'
				d='flex'
				w='100%'
				justifyContent='space-between'
				alignItems='center'
			>
				My Chats
				<GroupChatModal>
					<ReactTooltip
						id='group-button'
						aria-haspopup='true'
						place='top'
						type='dark'
						effect='float'
					>
						<p>Create new Chat Croup</p>
					</ReactTooltip>
					<Button
						data-tip
						data-for='group-button'
						d='flex'
						fontFamily='Montserrat'
						fontSize={{ base: '17px', md: '10px', lg: '17px' }}
						letterSpacing='1px'
						rightIcon={<AddIcon />}
					>
						New Group Chat
					</Button>
				</GroupChatModal>
			</Box>
			<Box
				d='flex'
				flexDir='column'
				p={3}
				bg='#F8F8F8'
				w='100%'
				h='100%'
				borderRadius='lg'
				overflowY='hidden'
			>
				{chats ? (
					<Stack overflowY='scroll'>
						{chats.map(chat => (
							<Box
								onClick={() => setSelectedChat(chat)}
								cursor='pointer'
								bg={selectedChat === chat ? '#007dc6' : '#E8E8E8'}
								color={selectedChat === chat ? 'white' : 'black'}
								px={3}
								py={2}
								borderRadius='lg'
								key={chat._id}
							>
								<ReactTooltip
									id='user-textfield'
									aria-haspopup='true'
									place='top'
									type='dark'
									effect='float'
								>
									<p>Click on user to chat</p>
								</ReactTooltip>
								<Text
									data-tip
									data-for='user-textfield'
									fontFamily='Anonymous Pro'
								>
									{!chat.isGroupChat
										? getSender(loggedUser, chat.users)
										: chat.chatName}
								</Text>
								{chat.latestMessage && (
									<Text fontSize='xs' fontFamily='Anonymous Pro'>
										<b>{chat.latestMessage.sender.name} : </b>
										{chat.latestMessage.content.length > 50
											? chat.latestMessage.content.substring(0, 51) +
											'...'
											: chat.latestMessage.content}
									</Text>
								)}
							</Box>
						))}
					</Stack>
				) : (
					<ChatLoading />
				)}
			</Box>
		</Box>
	);
}
