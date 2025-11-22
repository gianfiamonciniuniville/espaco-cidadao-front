export interface LoginUserDto {
	email: string;
	password: string;
}

export interface RegisterUserDto {
	username: string;
	firstName: string;
	lastName: string;
	document: string;
	phone: string;
	email: string;
	password: string;
}

export interface UpdateUserProfileDto {
	bio?: string | null;
	profileImageUrl?: string | null;
}

export interface UserShortDto {
	id: number;
	firstName?: string | null;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	document: string;
	phone: string;
	email: string;
	bio?: string;
	profileImageUrl?: string;
	role: string; // Added role
}

export interface AuthResponseDto {
	token: string;
	user: User;
}
