import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useEffect, useState } from "react";
import type { Report } from "../types/report";
import { ReportStatus } from "../types/report";
import { useLocation } from "../hooks/useLocation";
import { ReportListItem } from "../components/ReportListItem";

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
					<div>
						{filteredReports.map((report) => (
							<ReportListItem
								key={report.id}
								report={report}
								onClick={() => handleRowClick(report.id)}
							/>
						))}
					</div>
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
	variant: "open" | "closed" | "progress" | "all";
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
			: variant === "all"
			? "#6B7280"
			: "#6B7280"};
`;

const Demands = styled.div`
	margin-top: 10px;
`;