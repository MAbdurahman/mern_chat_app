import React from 'react'
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
	IconButton,
	Text,
	Image,
} from '@chakra-ui/react';

export default function ProfileModal({ user, children }) {
	//**************** variables ****************//
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton
					d={{ base: 'flex' }}
					icon={<ViewIcon />}
					onClick={onOpen}
				/>
			)}
			<Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent h='410px'>
					<ModalHeader
						fontSize={{base: '20px', md: '36px'}}
						fontFamily='Montserrat'
						d='flex'
						justifyContent='center'
					>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d='flex'
						flexDir='column'
						alignItems='center'
						justifyContent='space-between'
					>
						<Image
							borderRadius='full'
							boxSize='150px'
							src={user.pic}
							alt={user.name}
						/>
						<Text
							fontSize={{ base: '12px', md: '18px' }}
							fontFamily='Anonymous Pro'
						>
							Email: {user.email}
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
