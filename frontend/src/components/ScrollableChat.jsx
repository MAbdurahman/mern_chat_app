import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Tooltip } from '@chakra-ui/tooltip';
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from './../context/chatContext';
import {
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
	isSameUser,
} from './../config/chatLogicsConfig';

export default function ScrollableChat({ messages }) {
	//**************** variables ****************//
	const { user } = ChatState();

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, i) => (
					<div style={{ display: 'flex' }} key={m._id}>
						{(isSameSender(messages, m, i, user._id) ||
							isLastMessage(messages, i, user._id)) && (
							<Tooltip
							letterSpacing='1px'
								label={m.sender.name}
								placement='top-start'
								hasArrow
							>
								<Avatar
									mt='7px'
									mr={1}
									size='sm'
									cursor='pointer'
									name={m.sender.name}
									src={m.sender.pic}
								/>
							</Tooltip>
						)}
						<span
							style={{
								backgroundColor: `${
									m.sender._id === user._id ? '#094283' : '#4880d4'
								}`,
								fontFamily: 'Anonymous Pro',
								color: `${
									m.sender._id === user.id ? '#ffffff' : '#ffffff'
								}`,
								letterSpacing: '1px',
								marginLeft: isSameSenderMargin(
									messages,
									m,
									i,
									user._id
								),
								marginTop: isSameUser(messages, m, i, user._id)
									? 3
									: 10,
								borderRadius: '20px',
								padding: '5px 15px',
								maxWidth: '75%',
							}}
						>
							{m.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	);
}
