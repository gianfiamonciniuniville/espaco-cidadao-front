import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import * as GlobalStyles from "../components/global-styled";

export const Header = () => {
	const navigate = useNavigate();
	const { logout } = useUserStore();

	const handleLogout = () => {
		logout(); // This should clear the user state in the store
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		navigate("/login");
	};

	return (
		<HeaderContainer>
			<a href="/">
				<LogoImage src="logo.png" alt="Espaço Cidadão" />
			</a>
			{localStorage.getItem("token") || localStorage.getItem("userId") ? (
				<LogoutButton onClick={handleLogout}>Sair</LogoutButton>
			) : (
				<GlobalStyles.LinkButton onClick={() => navigate("/login")}>
					Log-in
				</GlobalStyles.LinkButton>
			)}
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	width: 90%;
	padding: 10px 20px;
	background-color: #f8f9fa; /* Light background for the header */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000; /* Ensure header stays on top */
`;

const LogoutButton = styled.button`
	background-color: #dc3545;
	color: white;
	border: none;
	padding: 8px 15px;
	border-radius: 5px;
`;

const LogoImage = styled.img`
	width: 64px;
	object-fit: contain;
`;
