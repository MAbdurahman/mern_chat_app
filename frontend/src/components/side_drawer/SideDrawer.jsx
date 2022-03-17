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
import NotificationBadge, { Effect } from 'react-notification-badge';
import ProfileModal from './ProfileModal';

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
				<Button variant='ghost'>
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
							/* count={notification.length}
								effect={Effect.SCALE} */
							/>
							<BellIcon fontSize='2xl' m={1} />
						</MenuButton>
						<MenuList pl={2}>
							{/* 							{!notification.length && 'No New Messages'}
							{notification.map(notif => (
								<MenuItem
									key={notif._id}
									onClick={() => {
										setSelectedChat(notif.chat);
										setNotification(
											notification.filter(n => n !== notif)
										);
									}}
								>
									{notif.chat.isGroupChat
										? `New Message in ${notif.chat.chatName}`
										: `New Message from ${getSender(
												user,
												notif.chat.users
										  )}`}
								</MenuItem>
							))} */}
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton
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

			<Drawer placement='left'>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
					<DrawerBody>
						<Box d='flex' pb={2}>
							<Input
								placeholder='Search by name or email'
								mr={2}
								/* value={search}
								onChange={e => setSearch(e.target.value)} */
							/>
							<Button>Go</Button>
						</Box>
						{/* 						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map(user => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>
							))
						)} */}
						{/* {loadingChat && <Spinner ml='auto' d='flex' />} */}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
