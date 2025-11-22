import api from "./api";
import type {
	CreateReportDto,
	Report,
	UpdateReportDto,
	ReportPhoto,
} from "../types/report";

export const createReport = async (
	reportData: CreateReportDto
): Promise<Report> => {
	const formData = new FormData();
	formData.append("Title", reportData.Title);
	formData.append("Description", reportData.Description);
	formData.append("Localization", reportData.Localization);
	reportData.Photos.forEach((photo) => {
		formData.append("Photos", photo);
	});

	const response = await api.post<Report>("/Report", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const getAllReports = async (): Promise<Report[]> => {
	const response = await api.get<Report[]>("/Report");
	return response.data;
};

export const getReportById = async (id: number): Promise<Report> => {
	const response = await api.get<Report>(`/Report/${id}`);
	return response.data;
};

export const updateReport = async (
	id: number,
	reportData: UpdateReportDto
): Promise<Report> => {
	const response = await api.put<Report>(`/Report/${id}`, reportData);
	return response.data;
};

export const getReportsByCity = async (city: string): Promise<Report[]> => {
	const response = await api.get<Report[]>(`/Report/city/${city}`);
	return response.data;
};

export const getReportsByUserId = async (userId: number): Promise<Report[]> => {
	const response = await api.get<Report[]>(`/Report/user/${userId}`);
	return response.data;
};

export const getReportPhotos = async (id: number): Promise<ReportPhoto[]> => {
	const response = await api.get<ReportPhoto[]>(`/Report/${id}/photos`);
	return response.data;
};
