import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { IconButton, Spinner, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ChatState } from './../context/chatContext';
import { getSender, getSenderFull } from '../config/chatLogicsConfig';
import ProfileModal from '../modals/ProfileModal';
import UpdateGroupChatModal from '../modals/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import Lottie from 'react-lottie';
import animationData from './../animations/typing.json';

export default function SingleChat({ fetchAgain, setFetchAgain }) {
	//**************** variables ****************//
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const toast = useToast();

	const {
		selectedChat,
		setSelectedChat,
		user,
		notification,
		setNotification,
	} = ChatState();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	//**************** functions ****************//
	const fetchMessages = async () => {
		if (!selectedChat) return;

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			setLoading(true);

			const { data } = await axios.get(
				`/api/v1/messages/${selectedChat._id}`,
				config
			);

			console.log(messages)
			setMessages(data);
			setLoading(false);
		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: 'Failed To Load The Messages!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	const sendMessage = async event => {
		if (event.key === ('Enter' && newMessage)) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				};

				setNewMessage('');

				const { data } = await axios.post(
					'/api/v1/messages',
					{
						content: newMessage,
						chatId: selectedChat._id,
					},
					config
				);
				console.log(data);
				setMessages([...messages, data]);
			} catch (error) {
				toast({
					title: 'Error Occurred!',
					description: 'Failed To Send The Message!',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			}
		}
	};

	const typingHandler = e => {
		setNewMessage(e.target.value);
	};

	useEffect(() => {
		fetchMessages();
	}, [selectedChat]);
	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb={3}
						px={2}
						w='100%'
						fontFamily='Montserrat'
						d='flex'
						justifyContent={{ base: 'space-between' }}
						alignItems='center'
					>
						<IconButton
							d={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat('')}
						/>
						{messages &&
							(!selectedChat.isGroupChat ? (
								<>
									{getSender(user, selectedChat.users)}
									<ProfileModal
										user={getSenderFull(user, selectedChat.users)}
									/>
								</>
							) : (
								<>
									{selectedChat.chatName.toUpperCase()}
									<UpdateGroupChatModal
										fetchMessages={fetchMessages}
										fetchAgain={fetchAgain}
										setFetchAgain={setFetchAgain}
									/>
								</>
							))}
					</Text>
					<Box
						d='flex'
						flexDir='column'
						justifyContent='flex-end'
						p={3}
						bg='#E8E8E8'
						w='100%'
						h='100%'
						borderRadius='lg'
						overflowY='hidden'
					>
						{loading ? (
							<Spinner
								size='xl'
								w={20}
								h={20}
								alignSelf='center'
								margin='auto'
							/>
						) : (
							<div className='messages'>
								<ScrollableChat messages={messages} />
							</div>
						)}
						<FormControl
							onKeyDown={sendMessage}
							id='first-name'
							isRequired
							mt={3}
						>
							{isTyping ? (
								<div>
									<Lottie
										options={defaultOptions}
										// height={50}
										width={70}
										style={{ marginBottom: 15, marginLeft: 0 }}
									/>
								</div>
							) : (
								<></>
							)}
							<Input
								variant='filled'
								bg='#E0E0E0'
								placeholder='Enter message...'
								value={newMessage}
								onChange={typingHandler}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				// to get socket.io on same page
				<Box d='flex' alignItems='center' justifyContent='center' h='100%'>
					<Text fontSize='3xl' pb={3} fontFamily='Montserrat'>
						Click on a user to start chatting
					</Text>
				</Box>
			)}
		</>
	);
}
