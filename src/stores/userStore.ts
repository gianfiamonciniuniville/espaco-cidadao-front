// src/stores/userStore.ts
import {create} from 'zustand';
import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  updateUserProfile as updateUserProfileApi,
  getUserById as getUserByIdApi,
  changeUserPassword as changeUserPasswordApi,
} from '../services/userService';
import { User, RegisterUserDto, LoginUserDto, UpdateUserProfileDto, ChangeUserPasswordDto } from '../types/user';

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  registerUser: (userData: RegisterUserDto) => Promise<void>;
  loginUser: (userData: LoginUserDto) => Promise<void>;
  updateUserProfile: (id: number, userData: UpdateUserProfileDto) => Promise<void>;
  getUserById: (id: number) => Promise<void>;
  changeUserPassword: (id: number, passwordData: ChangeUserPasswordDto) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  
  registerUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await registerUserApi(userData);
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to register user' });
    }
  },
  
  loginUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await loginUserApi(userData);
      localStorage.setItem('token', token);
      set({ token, user, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to login' });
    }
  },
  
  updateUserProfile: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const user = await updateUserProfileApi(id, userData);
      set({ user, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to update user profile' });
    }
  },
  
  getUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const user = await getUserByIdApi(id);
      set({ user, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to fetch user' });
    }
  },

  changeUserPassword: async (id, passwordData) => {
    set({ loading: true, error: null });
    try {
      await changeUserPasswordApi(id, passwordData);
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to change password' });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
