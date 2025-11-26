import api from "./api";
import type { Comment, CreateCommentDto } from "../types/comment";

export const createComment = async (commentData: CreateCommentDto): Promise<Comment> => {
	const formData = new FormData();
	formData.append("ReportId", commentData.reportId.toString());
	formData.append("UserId", commentData.userId.toString());
	formData.append("Content", commentData.content);
	commentData.photos.forEach((photo) => {
		formData.append("Photos", photo);
	});

	const response = await api.post<Comment>("/Comment", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const getCommentsByReportId = async (reportId: number): Promise<Comment[]> => {
	const response = await api.get<Comment[]>(`/Comment/report/${reportId}`);
	return response.data;
};
