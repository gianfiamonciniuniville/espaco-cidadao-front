import React from "react";
import styled from "styled-components";
import { Base64 } from "js-base64";
import type { Comment } from "../types/comment"; // Assuming a new comment type will be created

interface CommentListItemProps {
	comment: Comment;
}

export const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => {
	const formattedDate = new Date(comment.created).toLocaleDateString("pt-BR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<CommentCard>
			<CommentHeader>
				<AuthorName>{comment.user.firstName}</AuthorName>
				<CommentDate>{formattedDate}</CommentDate>
			</CommentHeader>
			<CommentContent>{comment.content}</CommentContent>
			{comment.photos && comment.photos.length > 0 && (
				<CommentImages>
					{comment.photos.map((photo, index) => (
						<CommentImage
							key={index}
							src={`data:image/jpeg;base64,${Base64.atob(photo.fileContents)}`} // Assuming base64 encoded
							alt={`Comment by ${comment.user.firstName}`}
						/>
					))}
				</CommentImages>
			)}
		</CommentCard>
	);
};

const CommentCard = styled.div`
	background: #f0f2f5;
	border-radius: 8px;
	padding: 10px 15px;
	margin-bottom: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const CommentHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
`;

const AuthorName = styled.span`
	font-weight: bold;
	color: #333;
	font-size: 0.95em;
`;

const CommentDate = styled.span`
	font-size: 0.75em;
	color: #666;
`;

const CommentContent = styled.p`
	font-size: 0.9em;
	color: #444;
	margin: 0;
	line-height: 1.4;
`;

const CommentImages = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	margin-top: 10px;
`;

const CommentImage = styled.img`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
	border: 1px solid #ddd;
`;
