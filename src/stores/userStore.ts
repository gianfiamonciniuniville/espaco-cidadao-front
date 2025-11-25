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

	registerUser: (userData: RegisterUserDto) => Promise<void>;
	loginUser: (userData: LoginUserDto) => Promise<void>;
	updateUserProfile: (
		id: number,
		userData: UpdateUserProfileDto
	) => Promise<void>;
	getUserById: (id: number) => Promise<void>;
	logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	token: localStorage.getItem("token"),
	userId: localStorage.getItem("userId"),
	loggedIn: !!(
		localStorage.getItem("token") && localStorage.getItem("userId")
	),
	loading: false,
	error: null,

	registerUser: async (userData) => {
		set({ loading: true, error: null });
		try {
			await registerUserApi(userData);
			set({ loading: false });
		} catch (error: any) {
			set({
				loading: false,
				error: error.message || "Failed to register user",
			});
		}
	},

	loginUser: async (userData) => {
		set({ loading: true, error: null });
		try {
			const { token, user } = await loginUserApi(userData);
			localStorage.setItem("token", token);
			localStorage.setItem("userId", user.id.toString());
			set({ token, user, loggedIn: true, loading: false });
		} catch (error: any) {
			set({ loading: false, error: error.message || "Failed to login" });
		}
	},

	updateUserProfile: async (id, userData) => {
		set({ loading: true, error: null });
		try {
			const user = await updateUserProfileApi(id, userData);
			set({ user, loading: false });
		} catch (error: any) {
			set({
				loading: false,
				error: error.message || "Failed to update user profile",
			});
		}
	},

	getUserById: async (id) => {
		set({ loading: true, error: null });
		try {
			const user = await getUserByIdApi(id);
			set({ user, loading: false });
		} catch (error: any) {
			set({ loading: false, error: error.message || "Failed to fetch user" });
		}
	},

	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		set({ user: null, token: null, userId: null, loggedIn: false });
	},
}));
