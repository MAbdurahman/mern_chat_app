import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { ChatState } from './../context/chatContext';

export default function SingleChat({ fetchAgain, setFetchAgain }) {
	//**************** variables ****************//
	const {
		selectedChat,
		setSelectedChat,
		user,
		notification,
		setNotification,
	} = ChatState();
	return (
		<>
			{selectedChat ? (
				<></>
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
