import type { UserShortDto } from "./user";

export interface CommentPhoto {
	fileContents: string;
}

export interface Comment {
	id: number;
	content: string;
	created: Date;
	user: UserShortDto;
	photosCount: number;
	photos?: CommentPhoto[];
}

export interface CreateCommentDto {
	content: string;
	reportId: number;
	userId: number;
	photos: File[];
}

export interface UpdateCommentDto {
	content?: string;
}
