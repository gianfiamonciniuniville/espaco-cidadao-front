/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/commentStore.ts
import { create } from "zustand";
import {
	createComment as createCommentApi,
	getCommentsByReportId as getCommentsByReportIdApi,
} from "../services/commentService";
import type { Comment, CreateCommentDto } from "../types/comment";
import axios from "axios";

interface CommentState {
	comments: Comment[];
	loading: boolean;
	error: string | null;

	fetchComments: (reportId: number) => Promise<boolean>;
	addComment: (commentData: CreateCommentDto) => Promise<boolean>;
}

export const useCommentStore = create<CommentState>((set) => ({
	comments: [],
	loading: false,
	error: null,

	fetchComments: async (reportId) => {
		set({ loading: true, error: null });
		try {
			const comments = await getCommentsByReportIdApi(reportId);
			set({ comments, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar comentários";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	addComment: async (commentData) => {
		set({ loading: true, error: null });
		try {
			const newComment = await createCommentApi(commentData);
			set((state) => ({
				comments: [newComment, ...state.comments], // Add new comment to the beginning
				loading: false,
			}));
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao adicionar comentário";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},
}));
