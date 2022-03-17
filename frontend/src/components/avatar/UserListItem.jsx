import React from 'react'
import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { ChatState } from '../../context/chatContext';

export default function UserListItem({ handleFunction }) {
	//**************** variables ****************//
	const { user } = ChatState();

	return (
		<Box
			onClick={handleFunction}
			cursor='pointer'
			bg='#d9d7e0'
			_hover={{
				background: '#007dc6',
				color: 'white',
			}}
			w='100%'
			d='flex'
			alignItems='center'
			color='black'
			px={3}
			py={2}
			mb={2}
			borderRadius='lg'
		>
			<Avatar
				mr={2}
				size='sm'
				cursor='pointer'
				name={user.name}
				src={user.pic}
			/>
			<Box>
				<Text>{user.name}</Text>
				<Text fontSize='xs'>
					<b>Email : </b>
					{user.email}
				</Text>
			</Box>
		</Box>
	);
}
