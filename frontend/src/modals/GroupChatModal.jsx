import React, { useState } from 'react';
import axios from 'axios';
import { ChatState } from '../context/chatContext';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	Input,
	useToast,
	Box,
} from '@chakra-ui/react';
import UserListItem from '../components/avatar/UserListItem';
import UserBadgeItem from './../components/avatar/UserBadgeItem';

export default function GroupChatModal({ children }) {
	//**************** variables ****************//
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const { user, chats, setChats } = ChatState();

	//**************** functions ****************//
	const handleGroup = () => {
		console.log('handleGroup');
	};

	const handleSearch = async () => {
		console.log('handleSearch');
	};

	const handleDelete = () => {
		console.log('handleDelete');
	};

	const handleSubmit = async () => {};
	return (
		<>
			<span onClick={onOpen}>{children}</span>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Montserrat'
						d='flex'
						justifyContent='center'
					>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody d='flex' flexDir='column' alignItems='center'>
						<FormControl>
							<Input
								placeholder='Chat Group Name'
								mb={3}
								onChange={e => setGroupChatName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add user's name"
								mb={1}
								onChange={e => handleSearch(e.target.value)}
							/>
						</FormControl>
						<Box w='100%' d='flex' flexWrap='wrap'>
							{selectedUsers.map(u => (
								<UserBadgeItem
									key={u._id}
									user={u}
									handleFunction={() => handleDelete(u)}
								/>
							))}
						</Box>
						{loading ? (
							// <ChatLoading />
							<div>Loading...</div>
						) : (
							searchResult
								?.slice(0, 4)
								.map(user => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => handleGroup(user)}
									/>
								))
						)}
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleSubmit} colorScheme='blue'>
							Create Chat
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
