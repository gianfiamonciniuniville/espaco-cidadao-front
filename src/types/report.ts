import type { UserShortDto } from "./user";

export enum ReportStatus {
	Pending,
	InProgress,
	Resolved,
}

export interface UpdateReportDto {
	title?: string;
	description?: string;
	status?: ReportStatus;
}

export interface CreateReportDto {
	UserId: number;
	Title: string;
	Description: string;
	Localization: string;
	Photos: File[];
}

export interface Report {
	id: number;
	title: string;
	description: string;
	localization: string;
	status: ReportStatus;
	user: UserShortDto;
	photosCount: number;
	created: Date;
	updated: Date;
}

export interface ReportPhoto {
	id: number;
	url: string;
	reportId: number;
}
