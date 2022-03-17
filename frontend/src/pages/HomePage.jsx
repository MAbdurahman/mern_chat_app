import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react';
import SignIn from '../components/authentication/SignIn';
import SignUp from '../components/authentication/SignUp';

export default function HomePage() {
	//**************** variables ****************//
	const history = useHistory();

	//**************** functions ****************//
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('userInfo'));

		if (user) history.push('/chats');
	}, [history]);

	return (
		<Container maxW='xl' centerContent>
			<Box
				d='flex'
				justifyContent='center'
				p={3}
				bg='white'
				w='100%'
				m='40px 0 15px 0'
				borderRadius='lg'
				borderWidth='1px'
			>
				<Text fontSize='4xl' fontFamily='Montserrat'>
					Chit-Chat
				</Text>
			</Box>
			<Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
				<Tabs isFitted variant='enclosed'>
					<TabList mb='1em'>
						<Tab _selected={{ color: 'white', bg: 'blue.500' }}>
							Sign In
						</Tab>
						<Tab _selected={{ color: 'white', bg: 'blue.500' }}>
							Sign Up
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<SignIn />
						</TabPanel>
						<TabPanel>
							<SignUp />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
}
