import React, { useState } from 'react';
import axios from 'axios';
import { ChatState } from '../context/chatContext';
import UserBadgeItem from '../components/avatar/UserBadgeItem';
import UserListItem from '../components/avatar/UserListItem';
import { ViewIcon } from '@chakra-ui/icons';
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
	IconButton,
	Spinner,
} from '@chakra-ui/react';

export default function UpdateGroupChatModal({
	fetchMessages,
	fetchAgain,
	setFetchAgain,
}) {
	//**************** variables ****************//
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameLoading, setRenameLoading] = useState(false);
	const toast = useToast();
	const { selectedChat, setSelectedChat, user } = ChatState();

	//**************** functions ****************//
	const handleSearch = async query => {
		setSearch(query);
		if (!query) {
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`/api/v1/user?search=${search}`,
				config
			);
			console.log(data);
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: 'Failed to Load the Search Results',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
			setLoading(false);
		}
	};

	const handleRename = async () => {
		if (!groupChatName) return;

		try {
			setRenameLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/v1/chats/rename-group`,
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config
			);

			console.log(data._id);
			// setSelectedChat("");
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setRenameLoading(false);
		}
		setGroupChatName('');
	};

	const handleAddUser = async addUser => {
		if (selectedChat.users.find(u => u._id === addUser._id)) {
			toast({
				title: 'User Already In The Group!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		if (selectedChat.groupAdmin._id !== user._id) {
			toast({
				title: 'Only Admins Can Add/Remove Users!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/v1/chats/add-to-group`,
				{
					chatId: selectedChat._id,
					userId: addUser._id,
				},
				config
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
         
		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});

			setLoading(false);
		}
		setGroupChatName('');
	};

	const handleRemoveUser = async removeUser => {
		if (selectedChat.groupAdmin._id !== user._id && removeUser._id !== user._id) {
			toast({
				title: 'Only Admins Can Add/Remove Users!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/v1/chats/remove-from-group`,
				{
					chatId: selectedChat._id,
					userId: removeUser._id,
				},
				config
			);

			removeUser._id === user._id ? setSelectedChat() : setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			fetchMessages();
			setLoading(false);

		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
		setGroupChatName('');
	};

	return (
		<>
			<IconButton
				d={{ base: 'flex' }}
				icon={<ViewIcon />}
				onClick={onOpen}
			/>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Montserrat'
						d='flex'
						justifyContent='center'
					>
						{selectedChat.chatName}
					</ModalHeader>

					<ModalCloseButton />
					<ModalBody d='flex' flexDir='column' alignItems='center'>
						<Box w='100%' d='flex' flexWrap='wrap' pb={3}>
							{selectedChat.users.map(u => (
								<UserBadgeItem
									key={u._id}
									user={u}
									admin={selectedChat.groupAdmin}
									handleFunction={() => handleRemoveUser(u)}
								/>
							))}
						</Box>
						<FormControl d='flex'>
							<Input
								placeholder='Chat Name'
								mb={3}
								value={groupChatName}
								onChange={e => setGroupChatName(e.target.value)}
							/>
							<Button
								variant='solid'
								colorScheme='yellow'
								ml={1}
								isLoading={renameLoading}
								onClick={handleRename}
							>
								Update
							</Button>
						</FormControl>
						<FormControl>
							<Input
								placeholder='Add User to group'
								mb={1}
								onChange={e => handleSearch(e.target.value)}
							/>
						</FormControl>

						{loading ? (
							<Spinner size='lg' />
						) : (
							searchResult?.map(user => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
								/>
							))
						)}
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={() => handleRemoveUser(user)}
							colorScheme='red'
						>
							Leave Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
