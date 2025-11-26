/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styled from "styled-components";
import * as GlobalStyles from "../components/global-styled";
import { useUserStore } from "../stores/userStore";
import { useCommentStore } from "../stores/commentStore"; // Import useCommentStore
import type { CreateCommentDto } from "../types/comment";

interface CommentFormProps {
	reportId: number;
	onCommentPosted: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
	reportId,
	onCommentPosted,
}) => {
	const { loggedIn, userId } = useUserStore();
	const { addComment } = useCommentStore(); // Use addComment from the store
	const [content, setContent] = useState("");
	const [photos, setPhotos] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhotos(Array.from(e.target.files));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!loggedIn || !userId) {
			setError("Você precisa estar logado para comentar.");
			setLoading(false);
			return;
		}

		if (!content.trim() && photos.length === 0) {
			setError("O comentário não pode ser vazio ou sem imagens.");
			setLoading(false);
			return;
		}

		const newComment: CreateCommentDto = {
			content: content,
			reportId: reportId,
			userId: Number(userId),
			photos: photos,
		};

		try {
			await addComment(newComment); // Call the addComment action from the store
			onCommentPosted();
			setContent("");
			setPhotos([]);
		} catch (err: any) {
			setError(err.message || "Erro ao postar comentário.");
		} finally {
			setLoading(false);
		}
	};

	if (!loggedIn) {
		return (
			<DisabledCommentBox>
				<StyledTextarea disabled placeholder="Faça o log-in para comentar" />
				<GlobalStyles.Button disabled variant="filled">
					Comentar
				</GlobalStyles.Button>
			</DisabledCommentBox>
		);
	}

	return (
		<CommentFormWrapper onSubmit={handleSubmit}>
			<StyledTextarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Escreva seu comentário..."
				rows={3}
				disabled={loading}
			/>
			<FileInputContainer>
				<FileInput
					type="file"
					multiple
					onChange={handleFileChange}
					disabled={loading}
				/>
				<FileInputLabel>
					{photos.length > 0
						? `${photos.length} arquivo(s) selecionado(s)`
						: "Anexar Imagens"}
				</FileInputLabel>
			</FileInputContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<GlobalStyles.Button type="submit" variant="filled" disabled={loading}>
				{loading ? "Comentando..." : "Comentar"}
			</GlobalStyles.Button>
		</CommentFormWrapper>
	);
};

const CommentFormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
	padding: 10px;
	background: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 8px;
`;

const StyledTextarea = styled.textarea`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 6px;
	font-size: 0.9em;
	resize: vertical;
	&:focus {
		outline: none;
		border-color: #009169;
		box-shadow: 0 0 0 2px rgba(0, 145, 105, 0.2);
	}
`;

const FileInputContainer = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
`;

const FileInput = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
	z-index: 10;
`;

const FileInputLabel = styled.label`
	display: block;
	padding: 8px 12px;
	background-color: #f0f0f0;
	border: 1px solid #ddd;
	border-radius: 6px;
	cursor: pointer;
	text-align: center;
	font-size: 0.9em;
	color: #555;
	&:hover {
		background-color: #e0e0e0;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 0.85em;
	margin: -5px 0 0;
`;

const DisabledCommentBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
	padding: 10px;
	background: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 8px;
`;
