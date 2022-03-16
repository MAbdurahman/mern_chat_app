import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import SideDrawer from '../components/side_drawer/SideDrawer';

export default function ChatPage() {
	return (
		<div style={{ width: '100%' }}>
		<SideDrawer />
			<Box
				d='flex'
				justifyContent='space-between'
				w='100%'
				h='91.5vh'
				p='10px'
			>
				<h2>Chat Page</h2>
			</Box>
		</div>
	);
}
