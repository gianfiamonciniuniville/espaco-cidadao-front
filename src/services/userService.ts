import api from "./api";
import type {
	LoginUserDto,
	RegisterUserDto,
	UpdateUserProfileDto,
	User,
	AuthResponseDto,
} from "../types/user";

export const registerUser = async (
	userData: RegisterUserDto
): Promise<User> => {
	const response = await api.post<User>("/User/register", userData);
	return response.data;
};

export const loginUser = async (
	userData: LoginUserDto
): Promise<AuthResponseDto> => {
	const response = await api.post<AuthResponseDto>("/User/login", userData);
	return response.data;
};

export const updateUserProfile = async (
	id: number,
	userData: UpdateUserProfileDto
): Promise<User> => {
	const response = await api.put<User>(`/User/profile/${id}`, userData);
	return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
	const response = await api.get<User>(`/User/${id}`);
	return response.data;
};
