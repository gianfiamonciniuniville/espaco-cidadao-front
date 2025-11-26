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

	fetchComments: (reportId: number) => Promise<void>;
	addComment: (commentData: CreateCommentDto) => Promise<void>;
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
		} catch (error: any) {
			set({
				loading: false,
				error: "Failed to fetch comments: " + error.message,
			});
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
		} catch (error: any) {
			if (axios.isAxiosError(error) && error.response?.data) {
				set({ loading: false, error: error.response.data });
			} else {
				set({
					loading: false,
					error: "Failed to add comment: " + error.message,
				});
			}
		}
	},
}));
