import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useEffect, useState } from "react";
import type { Report } from "../types/report";
import { ReportStatus } from "../types/report";
import { useLocation } from "../hooks/useLocation";

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

export const ListaRelatos = () => {
	const navigate = useNavigate();
	const { reports, getReportsByCity, loading, error } = useReportStore();
	const [filteredReports, setFilteredReports] = useState<Report[]>([]);
	const { city } = useLocation();

	useEffect(() => {
		if (city) {
			getReportsByCity(city);
		}
	}, [city, getReportsByCity]);

	useEffect(() => {
		setFilteredReports(reports);
	}, [reports]);

	const handleFilter = (status?: ReportStatus) => {
		if (status === undefined) {
			setFilteredReports(reports);
		} else {
			setFilteredReports(reports.filter((report) => report.status === status));
		}
	};

	const handleRowClick = (id: number) => {
		navigate(`/relato/${id}`);
	};

	return (
		<Container>
			<LogoWrapper />

			<Title>Relatos {city ? `de ${city}` : null}</Title>
			<LinkButton onClick={() => navigate(-1)} style={{ margin: "16px 0" }}>
				← Voltar
			</LinkButton>

			<StatusButtons>
				<StatusButton
					variant="all"
					onClick={() => handleFilter()}
					style={{ background: "#6B7280" }}>
					Todos
				</StatusButton>
				<StatusButton
					variant="open"
					onClick={() => handleFilter(ReportStatus.Pending)}>
					Em Aberto
				</StatusButton>
				<StatusButton
					variant="closed"
					onClick={() => handleFilter(ReportStatus.Resolved)}>
					Fechado
				</StatusButton>
				<StatusButton
					variant="progress"
					onClick={() => handleFilter(ReportStatus.InProgress)}>
					Andamento
				</StatusButton>
			</StatusButtons>

			<Demands>
				{loading ? (
					<p>Carregando relatos...</p>
				) : error ? (
					<p style={{ color: "red" }}>{error}</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Título</th>
								<th>Status</th>
								<th>Autor</th>
							</tr>
						</thead>
						<tbody>
							{filteredReports.map((report) => {
								const statusInfo = getStatusInfo(report.status);
								return (
									<tr
										key={report.id}
										onClick={() => handleRowClick(report.id)}
										style={{ cursor: "pointer" }}>
										<td>{report.title}</td>
										<td>
											<StatusLabel variant={statusInfo.variant}>
												{statusInfo.text}
											</StatusLabel>
										</td>
										<td>{report.user.firstName ?? "N/A"}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</Demands>
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

const StatusButtons = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 10px 0;
	flex-wrap: wrap;
	gap: 8px;
`;

const StatusButton = styled.button<{
	variant: StatusVariant | "all";
}>`
	border: none;
	padding: 6px 12px;
	border-radius: 20px;
	cursor: pointer;
	font-size: 0.8em;
	color: #fff;
	background: ${({ variant }) =>
		variant === "open"
			? "#3bb273"
			: variant === "closed"
			? "#c94c4c"
			: variant === "progress"
			? "#2f5d8a"
			: "#6B7280"};
`;

const Demands = styled.div`
	margin-top: 10px;
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		text-align: left;
		padding: 6px;
		font-size: 0.8em;
	}
	th {
		color: #333;
	}
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
