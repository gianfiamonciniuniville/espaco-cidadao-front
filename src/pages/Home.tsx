import { useNavigate } from "react-router";
import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";
import { useLocation } from "../hooks/useLocation";
import * as GlobalStyles from "../components/global-styled";

export const Home = () => {
	const navigate = useNavigate();
	const { city } = useLocation();

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<LogoWrapper />

				<GlobalStyles.Title>Bem-vindo ao Espaço Cidadão</GlobalStyles.Title>

				<Description>
					Uma plataforma para reportar problemas e sugerir melhorias para os
					espaços públicos
				</Description>

				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<GlobalStyles.Button
						onClick={() => navigate("/cadastro-relato")}
						variant="filled">
						Começar a postar
					</GlobalStyles.Button>
					<GlobalStyles.Button
						onClick={() => navigate("/mapa")}
						variant="outline">
						Ir para relatos {city ? `de ${city}` : null}
					</GlobalStyles.Button>
					<GlobalStyles.LinkButton onClick={() => navigate("/login")}>
						Log-in
					</GlobalStyles.LinkButton>
				</div>
			</GlobalStyles.Card>
		</GlobalStyles.Container>
	);
};

const Description = styled.p`
	font-size: 14px;
	color: #333;
	margin: 0 0 32px 0;
`;
