import { useNavigate } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { Button, Card, Container, Title } from "../components/global-styled";
import styled from "styled-components";

export const Mapa = () => {
	const { location, city } = useLocation();
	const navigate = useNavigate();

	return (
		<Container>
			<Card>
				<Title>Mapa de {city || "Localização Atual"}</Title>
				<MapContainer>
					{location ? (
						<iframe
							width="100%"
							height="100%"
							style={{ border: 0 }}
							src={`https://www.openstreetmap.org/export/embed.html?bbox=${
								location.longitude - 0.01
							},${location.latitude - 0.01},${location.longitude + 0.01},${
								location.latitude + 0.01
							}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
							allowFullScreen></iframe>
					) : (
						<p>Carregando mapa...</p>
					)}
				</MapContainer>
				<ButtonGroup>
					<Button variant="filled" onClick={() => navigate("/relatos")}>
						Relatos da Cidade
					</Button>
					<Button variant="outline" onClick={() => navigate("/my-relatos")}>
						Meus Relatos
					</Button>
					<Button variant="filled" onClick={() => navigate("/cadastro-relato")}>
						Adicionar Novo Relato
					</Button>
				</ButtonGroup>
			</Card>
		</Container>
	);
};

const MapContainer = styled.div`
	width: 100%;
	height: 400px;
	border-radius: 8px;
	overflow: hidden;
	margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
