import React, { useState } from 'react'
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
	//**************** variables ****************//
	const [show, setShow] = useState(false);
	const toast = useToast();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	//**************** functions ****************//
	const handleClick = () => setShow(!show);

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
			toast({
				title: 'Enter Values In All Fields!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			setLoading(false);
			return;
		}

		// console.log(email, password);
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'/api/v1/user/sign-in',
				{ email, password },
				config
			);

			// console.log(JSON.stringify(data));
			toast({
				title: 'Successfully Signed In!',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setLoading(false);
			history.push('/chats');

		} catch (error) {
			toast({
				title: 'Error Occurred!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			setLoading(false);
		}
	};

	return (
		<VStack spacing='10px'>
			<FormControl id='email' isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					value={email}
					type='email'
					placeholder='email'
					onChange={e => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id='password' isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size='md'>
					<Input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type={show ? 'text' : 'password'}
						placeholder='password'
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={loading}
			>
				Sign In
			</Button>
			<Button
				variant='solid'
				colorScheme='red'
				width='100%'
				onClick={() => {
					setEmail('guest@example.com');
					setPassword('abcd1234');
				}}
			>
				Guest User Credentials
			</Button>
		</VStack>
	);
}
