import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LinkButton } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useUserStore } from "../stores/userStore";
import type { Report } from "../types/report";
import { ReportStatus } from "../types/report";
import { ReportListItem } from "../components/ReportListItem";
import { SearchBar } from "../components/SearchBar";

export const ListaMeusRelatos = () => {
	const navigate = useNavigate();
	const { reports, getReportsByUserId, loading, error } = useReportStore();
	const { user } = useUserStore();
	const [filteredReports, setFilteredReports] = useState<Report[]>([]);
	const [activeFilter, setActiveFilter] = useState<ReportStatus | undefined>(
		undefined
	);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (user) {
			getReportsByUserId(user.id);
		}
	}, [getReportsByUserId, user]);

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

	const handleEdit = (id: number) => {
		navigate(`/edicao-relato/${id}`);
	};

	const handleOpen = (id: number) => {
		navigate(`/relato/${id}`);
	};

	return (
		<Container>
			<LinkButton onClick={() => navigate("/mapa")}>← Voltar</LinkButton>
			<h2>Meus Relatos</h2>

			<SearchBar
				onSearch={setSearchTerm}
				placeholder="Pesquisar por título..."
			/>

			<StatusButtons>
				<StatusButton
					variant="all"
					isActive={activeFilter === undefined}
					onClick={() => handleFilter()}>
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
					<p>Carregando...</p>
				) : error ? (
					<p>{error}</p>
				) : (
					<div>
						{filteredReports.map((d) => (
							<ReportListItem
								key={d.id}
								report={d}
								onClick={() => handleOpen(d.id)}
								onEdit={() => handleEdit(d.id)}
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
			? "#ff9800"
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
