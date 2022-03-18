import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { IconButton, Spinner, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ChatState } from './../context/chatContext';
import { getSender, getSenderFull } from '../config/chatLogicsConfig';
import ProfileModal from '../modals/ProfileModal';
import UpdateGroupChatModal from '../modals/UpdateGroupChatModal';

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

	//**************** functions ****************//
	const fetchMessages = async () => {
		console.log('fetchMessages');
	};

	const sendMessage = async e => {
		console.log(`sendMessage - ${e}`);
	};

	const typingHandler = () => {
		console.log('typingHandler');
	};
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
