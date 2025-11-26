/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
	registerUser as registerUserApi,
	loginUser as loginUserApi,
	updateUserProfile as updateUserProfileApi,
	getUserById as getUserByIdApi,
} from "../services/userService";
import type {
	User,
	RegisterUserDto,
	LoginUserDto,
	UpdateUserProfileDto,
} from "../types/user";

interface UserState {
	user: User | null;
	token: string | null;
	userId: string | null;
	loggedIn: boolean;
	loading: boolean;
	error: string | null;

	registerUser: (userData: RegisterUserDto) => Promise<boolean>;
	loginUser: (userData: LoginUserDto) => Promise<boolean>;
	updateUserProfile: (
		id: number,
		userData: UpdateUserProfileDto
	) => Promise<boolean>;
	getUserById: (id: number) => Promise<boolean>;
	logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	token: localStorage.getItem("token"),
	userId: localStorage.getItem("userId"),
	loggedIn: !!(localStorage.getItem("token") && localStorage.getItem("userId")),
	loading: false,
	error: null,

	registerUser: async (userData) => {
		set({ loading: true, error: null });
		try {
			await registerUserApi(userData);
			set({ loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao registrar usuário";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({
				loading: false,
				error: errorMessage,
			});
			return false;
		}
	},

	loginUser: async (userData) => {
		set({ loading: true, error: null });
		try {
			const { token, user } = await loginUserApi(userData);
			localStorage.setItem("token", token);
			localStorage.setItem("userId", user.id.toString());
			set({ token, user, loggedIn: true, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao fazer login";
			if (error.response && error.response.status === 400) {
				errorMessage = "Credenciais inválidas";
			} else if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	updateUserProfile: async (id, userData) => {
		set({ loading: true, error: null });
		try {
			const user = await updateUserProfileApi(id, userData);
			set({ user, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao atualizar o perfil do usuário";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({
				loading: false,
				error: errorMessage,
			});
			return false;
		}
	},

	getUserById: async (id) => {
		set({ loading: true, error: null });
		try {
			const user = await getUserByIdApi(id);
			set({ user, loading: false });
			return true;
		} catch (error: any) {
			let errorMessage = "Falha ao buscar usuário";
			if (error.response && error.response.data) {
				errorMessage = error.response.data.title;
			}
			set({ loading: false, error: errorMessage });
			return false;
		}
	},

	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		set({ user: null, token: null, userId: null, loggedIn: false });
	},
}));
