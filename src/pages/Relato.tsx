import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useEffect } from "react";
import { ReportStatus } from "../types/report";
import { Base64 } from "js-base64";

type StatusVariant = "open" | "closed" | "progress";

const getStatusInfo = (
	status: ReportStatus
): { text: string; variant: StatusVariant } => {
	switch (status) {
		case ReportStatus.Pending:
			return { text: "Em Aberto", variant: "open" };
		case ReportStatus.Resolved:
			return { text: "Fechado", variant: "closed" };
		case ReportStatus.InProgress:
			return { text: "Andamento", variant: "progress" };
		default:
			return { text: "Desconhecido", variant: "progress" };
	}
};

export const Relato = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { report, getReportById, photos, getReportPhotos, loading, error } =
		useReportStore();

	useEffect(() => {
		if (id) {
			getReportById(Number(id));
			getReportPhotos(Number(id));
		}
	}, [id, getReportById, getReportPhotos]);

	if (loading) {
		return <div>Carregando...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!report) {
		return <div>Relato não encontrado</div>;
	}

	const statusInfo = getStatusInfo(report.status);

	return (
		<Container>
			<Title>Detalhes do Relato {report.id}</Title>
			<LinkButton onClick={() => navigate(-1)} style={{ margin: "16px 0" }}>
				← Voltar
			</LinkButton>

			<Card>
				{photos.length > 0 && (
					<img
						src={Base64.atob(photos[0].fileContents)}
						alt={report.title}
						style={{ width: "100%", borderRadius: "8px" }}
					/>
				)}
				<h3>
					Demanda{" "}
					<StatusLabel variant={statusInfo.variant}>
						{statusInfo.text}
					</StatusLabel>
				</h3>
				<p>
					<strong>{report.title}</strong>
				</p>
				<p>"{report.description}"</p>
			</Card>

			<Card>
				<h3>Localização</h3>
				<p>"{report.localization}"</p>
				<img
					src={`https://via.placeholder.com/400x200.png?text=Mapa+de+${report.localization}`}
					alt="Mapa"
					style={{ width: "100%", borderRadius: "8px" }}
				/>
			</Card>

			<StyledTextarea rows={3} placeholder="Comente..." />
		</Container>
	);
};

const Container = styled.div`
	background: #fff;
	width: 350px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 15px;
`;

const Card = styled.div`
	background: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 10px;
	margin-bottom: 12px;
	h3 {
		margin: 0 0 5px;
		font-size: 1em;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	p {
		margin: 4px 0;
		font-size: 0.85em;
		color: #555;
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 6px;
	padding: 6px;
	font-size: 0.85em;
`;

const StatusLabel = styled.span<{ variant: StatusVariant }>`
	padding: 2px 8px;
	border-radius: 12px;
	color: white;
	font-size: 0.75em;
	background: ${({ variant }) =>
		variant === "open"
			? "#3bb273"
			: variant === "closed"
			? "#c94c4c"
			: "#2f5d8a"};
`;
