import { useNavigate } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { Button, Card, Container, Title } from "../components/global-styled";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useReportStore } from "../stores/reportStore";
import { useEffect } from "react";

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export const Mapa = () => {
	const { location, city } = useLocation();
	const navigate = useNavigate();
	const { loggedIn } = useUserStore();
	const { reports, getAllReports, loading, error } = useReportStore();

	useEffect(() => {
		getAllReports();
	}, [getAllReports]);

	const defaultCenter: [number, number] = [-26.3044, -48.8477]; // Default to Joinville, SC

	return (
		<Container>
			<Card>
				<Title>Mapa de Relatos {city ? `em ${city}` : ""}</Title>
				<MapContainer
					center={
						location ? [location.latitude, location.longitude] : defaultCenter
					}
					zoom={location ? 13 : 11}
					scrollWheelZoom={true}
					style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{reports
						.filter((report) => report.latitude && report.longitude)
						.map((report) => (
							<Marker
								key={report.id}
								position={[report.latitude!, report.longitude!]}>
								<Popup>
									<strong>{report.title}</strong>
									<br />
									{report.description}
									<br />
									<StyledLinkButton onClick={() => navigate(`/relato/${report.id}`)}>
										Ver Detalhes
									</StyledLinkButton>
								</Popup>
							</Marker>
						))}
				</MapContainer>
				{loading && <p>Carregando relatos no mapa...</p>}
				{error && <p style={{ color: "red" }}>Erro ao carregar relatos: {error}</p>}
				<ButtonGroup>
					<Button variant="filled" onClick={() => navigate("/relatos")}>
						Ver Todos os Relatos
					</Button>
					{loggedIn && (
						<Button variant="outline" onClick={() => navigate("/meus-relatos")}>
							Meus Relatos
						</Button>
					)}
					<Button variant="filled" onClick={() => navigate("/cadastro-relato")}>
						Adicionar Novo Relato
					</Button>
				</ButtonGroup>
			</Card>
		</Container>
	);
};

const StyledLinkButton = styled.button`
	background: none;
	border: none;
	color: #007bff;
	cursor: pointer;
	padding: 0;
	text-decoration: underline;
	font-size: 0.9em;

	&:hover {
		color: #0056b3;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 20px;
`;

