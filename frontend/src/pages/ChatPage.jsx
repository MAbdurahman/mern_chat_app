import React, { useState } from 'react';
import { ChatState } from './../context/chatContext';
import { Box } from '@chakra-ui/layout';
import SideDrawer from '../components/side_drawer/SideDrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';

export default function ChatPage() {
	//**************** variables ****************//
	const [fetchAgain, setFetchAgain] = useState(false);
	const { user } = ChatState();

	return (
		<div style={{ width: '100%' }}>
			{user && <SideDrawer />}
			<Box
				d='flex'
				justifyContent='space-between'
				w='100%'
				h='91.5vh'
				p='10px'
			>
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
		</div>
	);
}
