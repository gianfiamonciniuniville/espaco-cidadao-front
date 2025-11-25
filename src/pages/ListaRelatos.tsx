import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useEffect, useState } from "react";
import type { Report } from "../types/report";
import { ReportStatus } from "../types/report";
import { useLocation } from "../hooks/useLocation";
import { ReportListItem } from "../components/ReportListItem";
import { SearchBar } from "../components/SearchBar";

export const ListaRelatos = () => {
	const navigate = useNavigate();
	const { reports, getReportsByCity, loading, error } = useReportStore();
	const [filteredReports, setFilteredReports] = useState<Report[]>([]);
	const [activeFilter, setActiveFilter] = useState<ReportStatus | undefined>(
		undefined
	);
	const [searchTerm, setSearchTerm] = useState("");
	const { city } = useLocation();

	useEffect(() => {
		if (city) {
			getReportsByCity(city);
		}
	}, [city, getReportsByCity]);

	useEffect(() => {
		let result = reports;

		if (activeFilter !== undefined) {
			result = result.filter((report) => report.status === activeFilter);
		}

		if (searchTerm) {
			result = result.filter((report) =>
				report.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredReports(result);
	}, [reports, activeFilter, searchTerm]);

	const handleFilter = (status?: ReportStatus) => {
		setActiveFilter(status);
	};

	const handleRowClick = (id: number) => {
		navigate(`/relato/${id}`);
	};

	return (
		<Container>
			<LinkButton onClick={() => navigate(-1)}>← Voltar</LinkButton>
			<Title>Relatos {city ? `de ${city}` : null}</Title>

			<SearchBar
				onSearch={setSearchTerm}
				placeholder="Pesquisar por título..."
			/>

			<StatusButtons>
				<StatusButton
					variant="all"
					isActive={activeFilter === undefined}
					onClick={() => handleFilter()}
					style={{ background: "#6B7280" }}>
					Todos
				</StatusButton>
				<StatusButton
					variant="open"
					isActive={activeFilter === ReportStatus.Pending}
					onClick={() => handleFilter(ReportStatus.Pending)}>
					Em Aberto
				</StatusButton>
				<StatusButton
					variant="closed"
					isActive={activeFilter === ReportStatus.Resolved}
					onClick={() => handleFilter(ReportStatus.Resolved)}>
					Fechado
				</StatusButton>
				<StatusButton
					variant="progress"
					isActive={activeFilter === ReportStatus.InProgress}
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
	isActive?: boolean;
}>`
	border: none;
	padding: 6px 12px;
	border-radius: 20px;
	cursor: pointer;
	font-size: 0.8em;
	color: #fff;
	background: ${({ variant, isActive }) =>
		isActive
			? "#ff9800" // A different color for the active button
			: variant === "open"
			? "#3bb273"
			: variant === "closed"
			? "#c94c4c"
			: variant === "progress"
			? "#2f5d8a"
			: "#6B7280"};
	border: ${({ isActive }) => (isActive ? "2px solid #e68a00" : "none")};
	transform: ${({ isActive }) => (isActive ? "scale(1.05)" : "scale(1)")};
	transition: all 0.2s;
`;

const Demands = styled.div`
	margin-top: 10px;
`;
