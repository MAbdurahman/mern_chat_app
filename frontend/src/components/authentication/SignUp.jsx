import React, { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function SignUp() {
	//**************** variables ****************//
	const toast = useToast();
	const history = useHistory();
	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [password, setPassword] = useState();
	const [pic, setPic] = useState();
	const [picLoading, setPicLoading] = useState(false);

	//**************** functions ****************//
	const handleClick = () => setShow(!show);

	const submitHandler = async () => {
		setPicLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: 'Enter Values In All Fields!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			setPicLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: 'Passwords Do Not Match!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			return;
		}
		console.log(name, email, password, pic);
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/v1/user/signup',
				{
					name,
					email,
					password,
					pic,
				},
				config
			);
			console.log(data);
			toast({
				title: 'Successfully Signed Up!',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setPicLoading(false);
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
			setPicLoading(false);
		}
	};

	const postDetails = pics => {
		setPicLoading(true);
		if (pics === undefined) {
			toast({
				title: 'Please Select An Image!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			return;
		}
		console.log(pics);
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_APP}`);
			data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_USERNAME}`);
			fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
				method: 'post',
				body: data,
			})
				.then(res => res.json())
				.then(data => {
					setPic(data.url.toString());
					console.log(data.url.toString());
					setPicLoading(false);
				})
				.catch(err => {
					console.log(err);
					setPicLoading(false);
				});
		} else {
			toast({
				title: 'Please Select An Image!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			setPicLoading(false);
			return;
		}
	};

	return (
		<VStack spacing='5px'>
			<FormControl id='first-name' isRequired>
				<FormLabel>Name</FormLabel>
				<Input placeholder='name' onChange={e => setName(e.target.value)} />
			</FormControl>
			<FormControl id='email-1' isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					type='email'
					placeholder='example@email.com'
					onChange={e => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id='password-1' isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size='md'>
					<Input
						type={show ? 'text' : 'password'}
						placeholder='password'
						onChange={e => setPassword(e.target.value)}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id='password-2' isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size='md'>
					<Input
						type={show ? 'text' : 'password'}
						placeholder='confirmed password'
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id='pic'>
				<FormLabel>Upload Your Picture</FormLabel>
				<Input
					type='file'
					p={1.5}
					accept='image/*'
					onChange={e => postDetails(e.target.files[0])}
				/>
			</FormControl>
			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={picLoading}
			>
				Sign Up
			</Button>
		</VStack>
	);
}
