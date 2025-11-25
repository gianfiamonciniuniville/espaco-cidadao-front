import type { UserShortDto } from "./user";

export enum ReportStatus {
	Pending,
	InProgress,
	Resolved,
}

export interface UpdateReportDto {
	title?: string;
	description?: string;
	localization?: string;
	latitude?: number | null;
	longitude?: number | null;
	status?: ReportStatus;
}

export interface CreateReportDto {
	UserId: number;
	Title: string;
	Description: string;
	Localization: string;
	Latitude: number | null;
	Longitude: number | null;
	Photos: File[];
}

export interface Report {
	id: number;
	title: string;
	description: string;
	localization: string;
	latitude: number | null;
	longitude: number | null;
	status: ReportStatus;
	user: UserShortDto;
	photosCount: number;
	created: Date;
	updated: Date;
}

export interface ReportPhoto {
	fileContents: string;
}
