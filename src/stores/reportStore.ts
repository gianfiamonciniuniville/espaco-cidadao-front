// src/stores/reportStore.ts
import { create } from "zustand";
import {
	createReport as createReportApi,
	getAllReports as getAllReportsApi,
	getReportById as getReportByIdApi,
	updateReport as updateReportApi,
	getReportsByCity as getReportsByCityApi,
	getReportsByUserId as getReportsByUserIdApi,
	getReportPhotos as getReportPhotosApi,
} from "../services/reportService";
import type {
	Report,
	CreateReportDto,
	UpdateReportDto,
	ReportPhoto,
}
 from "../types/report";
import { Base64 } from "js-base64";
import axios from "axios";

interface ReportState {
	reports: Report[];
	report: Report | null;
	photos: ReportPhoto[];
	loading: boolean;
	error: string | null;

	createReport: (reportData: CreateReportDto) => Promise<boolean>;
	getAllReports: () => Promise<boolean>;
	getReportById: (id: number) => Promise<boolean>;
	updateReport: (id: number, reportData: UpdateReportDto) => Promise<boolean>;
	getReportsByCity: (city: string) => Promise<boolean>;
	getReportsByUserId: (userId: number) => Promise<boolean>;
	getReportPhotos: (id: number) => Promise<boolean>;
}

export const useReportStore = create<ReportState>((set) => ({
	reports: [],
	report: null,
	photos: [],
	loading: false,
	error: null,

	createReport: async (reportData) => {
		set({ loading: true, error: null });
		try {
			await createReportApi(reportData);
			set({ loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao criar relato";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	getAllReports: async () => {
		set({ loading: true, error: null });
		try {
			const reports = await getAllReportsApi();
			set({ reports, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar relatos";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	getReportById: async (id) => {
		set({ loading: true, error: null });
		try {
			const report = await getReportByIdApi(id);
			set({ report, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar relato";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	updateReport: async (id, reportData) => {
		set({ loading: true, error: null });
		try {
			await updateReportApi(id, reportData);
			set({ loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao atualizar relato";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	getReportsByCity: async (city) => {
		set({ loading: true, error: null });
		try {
			const reports = await getReportsByCityApi(city);
			set({ reports, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar relatos por cidade";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	getReportsByUserId: async (userId) => {
		set({ loading: true, error: null });
		try {
			const reports = await getReportsByUserIdApi(userId);
			set({ reports, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar relatos por usuário";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	getReportPhotos: async (id) => {
		set({ loading: true, error: null });
		try {
			const photos = await getReportPhotosApi(id);
			set({ photos, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar fotos do relato";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},
}));