import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LinkButton } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useUserStore } from "../stores/userStore";
import { ReportStatus } from "../types/report";
import { ReportListItem } from "../components/ReportListItem";

export const ListaMeusRelatos = () => {
	const navigate = useNavigate();
	const { reports, getReportsByUserId, loading, error } = useReportStore();
	const { user } = useUserStore();

	useEffect(() => {
		if (user) {
			getReportsByUserId(user.id);
		}
	}, [getReportsByUserId, user]);

	const handleEdit = (id: number) => {
		navigate(`/edicao-relato/${id}`);
	};

	const handleOpen = (id: number) => {
		navigate(`/relato/${id}`);
	};

	return (
		<Container>
			<LinkButton
				onClick={() => navigate("/mapa")}
				style={{ margin: "16px 0" }}>
				← Voltar
			</LinkButton>
			<h2>Meus Relatos</h2>
			<StatusButtons>
				<StatusButton variant="open">Em Aberto</StatusButton>
				<StatusButton variant="closed">Fechado</StatusButton>
				<StatusButton variant="progress">Andamento</StatusButton>
			</StatusButtons>

			<Demands>
				{loading ? (
					<p>Carregando...</p>
				) : error ? (
					<p>{error}</p>
				) : (
					<div>
						{reports.map((d) => (
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
`;

const StatusButton = styled.button<{ variant: "open" | "closed" | "progress" }>`
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
			: "#2f5d8a"};
`;

const Demands = styled.div`
	margin-top: 10px;
`;
