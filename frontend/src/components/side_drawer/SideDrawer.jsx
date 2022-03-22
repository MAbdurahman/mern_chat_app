import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ChatState } from '../../context/chatContext';
import ReactTooltip from 'react-tooltip';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/menu';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from '@chakra-ui/modal';
import { BellIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { useToast } from '@chakra-ui/toast';
import { Spinner } from '@chakra-ui/spinner';
import NotificationBadge, { Effect } from 'react-notification-badge';
import { getSender } from '../../config/chatLogicsConfig';
import ProfileModal from '../../modals/ProfileModal';
import ChatLoading from './../ChatLoading';
import UserListItem from '../avatar/UserListItem';

export default function SideDrawer() {
	//**************** variables ****************//
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);

	const {
		setSelectedChat,
		user,
		notification,
		setNotification,
		chats,
		setChats,
	} = ChatState();

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();

	//**************** functions ****************//
	const signOutHandler = () => {
		localStorage.removeItem('userInfo');
		history.push('/');
	};

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: 'Enter name or email to search!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
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

			const { data } = await axios.get(
				`/api/v1/user?search=${search}`,
				config
			);

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: 'Failed to Load the Search Results!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	const accessChat = async userId => {
		console.log(userId);

		try {
			setLoadingChat(true);
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(`/api/v1/chats`, { userId }, config);

			if (!chats.find(c => c._id === data._id)) setChats([data, ...chats]);
			setSelectedChat(data);
			setLoadingChat(false);
			onClose();
		} catch (error) {
			toast({
				title: 'Error Fetching The Chats!',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	return (
		<>
			<Box
				d='flex'
				justifyContent='space-between'
				alignItems='center'
				bg='white'
				w='100%'
				p='5px 10px 5px 10px'
				borderWidth='5px'
			>
				<Button variant='ghost' onClick={onOpen}>
					<Search2Icon />
					<ReactTooltip
						id='search'
						aria-haspopup='true'
						place='top'
						type='dark'
						effect='float'
					>
						<p>Search For User To Chat</p>
					</ReactTooltip>
					<Text
						data-tip
						data-for='search'
						d={{ base: 'none', md: 'flex' }}
						px={4}
						fontFamily='Montserrat'
						letterSpacing='1px'
					>
						User Search
					</Text>
				</Button>

				<Text fontSize='2xl' fontFamily='Montserrat'>
					Chit-Chat
				</Text>
				<div>
					<Menu>
						<MenuButton p={1}>
							<NotificationBadge
								count={notification.length}
								effect={Effect.SCALE}
							/>
							<BellIcon fontSize='2xl' m={1} />
						</MenuButton>
						<MenuList pl={2}>
							{!notification.length && 'No New Messages'}
							{notification.map(notify => (
								<MenuItem
									key={notify._id}
									onClick={() => {
										setSelectedChat(notify.chat);
										setNotification(
											notification.filter(n => n !== notify)
										);
									}}
								>
									{notify.chat.isGroupChat
										? `New Message in ${notify.chat.chatName}`
										: `New Message from ${getSender(
												user,
												notify.chat.users
										  )}`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Menu>
						<ReactTooltip
							id='menu-button'
							aria-haspopup='true'
							place='top'
							type='dark'
							effect='float'
						>
							<p>View Profile or Sign Out</p>
						</ReactTooltip>
						<MenuButton
							data-tip
							data-for='menu-button'
							as={Button}
							bg='white'
							rightIcon={<ChevronDownIcon />}
						>
							<Avatar
								size='sm'
								cursor='pointer'
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>

			<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader
						fontFamily='Montserrat'
						letterSpacing='1px'
						borderBottomWidth='1px'
					>
						Search Users
					</DrawerHeader>
					<DrawerBody>
						<Box d='flex' pb={2}>
							<Input
								placeholder='Search by name or email'
								mr={2}
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>Go</Button>
						</Box>
						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map(user => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>
							))
						)}
						{loadingChat && <Spinner ml='auto' d='flex' />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
