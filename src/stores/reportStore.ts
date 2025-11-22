// src/stores/reportStore.ts
import {create} from 'zustand';
import {
  createReport as createReportApi,
  getAllReports as getAllReportsApi,
  getReportById as getReportByIdApi,
  updateReport as updateReportApi,
  getReportsByCity as getReportsByCityApi,
  getReportsByUserId as getReportsByUserIdApi,
  getReportPhotos as getReportPhotosApi,
} from '../services/reportService';
import { Report, CreateReportDto, UpdateReportDto, ReportPhoto } from '../types/report';

interface ReportState {
  reports: Report[];
  report: Report | null;
  photos: ReportPhoto[];
  loading: boolean;
  error: string | null;
  
  createReport: (reportData: CreateReportDto) => Promise<void>;
  getAllReports: () => Promise<void>;
  getReportById: (id: number) => Promise<void>;
  updateReport: (id: number, reportData: UpdateReportDto) => Promise<void>;
  getReportsByCity: (city: string) => Promise<void>;
  getReportsByUserId: (userId: number) => Promise<void>;
  getReportPhotos: (id: number) => Promise<void>;
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
    } catch (error) {
      set({ loading: false, error: 'Failed to create report' });
    }
  },
  
  getAllReports: async () => {
    set({ loading: true, error: null });
    try {
      const reports = await getAllReportsApi();
      set({ reports, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch reports' });
    }
  },
  
  getReportById: async (id) => {
    set({ loading: true, error: null });
    try {
      const report = await getReportByIdApi(id);
      set({ report, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch report' });
    }
  },
  
  updateReport: async (id, reportData) => {
    set({ loading: true, error: null });
    try {
      await updateReportApi(id, reportData);
      set({ loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to update report' });
    }
  },
  
  getReportsByCity: async (city) => {
    set({ loading: true, error: null });
    try {
      const reports = await getReportsByCityApi(city);
      set({ reports, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch reports by city' });
    }
  },
  
  getReportsByUserId: async (userId) => {
    set({ loading: true, error: null });
    try {
      const reports = await getReportsByUserIdApi(userId);
      set({ reports, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch reports by user' });
    }
  },

    getReportPhotos: async (id) => {
    set({ loading: true, error: null });
    try {
      const photos = await getReportPhotosApi(id);
      set({ photos, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch report photos' });
    }
    },
}));
