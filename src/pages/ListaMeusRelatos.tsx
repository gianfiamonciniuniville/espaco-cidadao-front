import { useNavigate } from "react-router-dom";
import { LogoWrapper } from "../components/LogoWrapper";
import styled from "styled-components";
import { LinkButton } from "../components/global-styled";

export const ListaMeusRelatos = () => {
	const navigate = useNavigate();
	const demandas = [
		{
			id: 1,
			titulo: "Semáforo queimado",
			status: "Em Aberto",
			data: "20/10/2025",
		},
		{
			id: 2,
			titulo: "Iluminação na Rua A",
			status: "Fechado",
			data: "21/10/2025",
		},
		{
			id: 3,
			titulo: "Buraco na rodovia",
			status: "Andamento",
			data: "20/10/2025",
		},
		{
			id: 4,
			titulo: "Placa de trânsito caiu",
			status: "Fechado",
			data: "20/10/2025",
		},
	];

	const handleEdit = (id: number) => {
		navigate(`/edicao-relato/${id}`);
	};

	const handleOpen = (id: number) => {
		navigate(`/relato/${id}`);
	};

	return (
		<Container>
			<LogoWrapper />
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
				<table>
					<thead>
						<tr>
							<th>Título</th>
							<th>Status</th>
							<th>Data</th>
							<th>Ação</th>
						</tr>
					</thead>
					<tbody>
						{demandas.map((d) => (
							<tr key={d.id}>
								<TitleReport onClick={() => handleOpen(d.id)}>
									{d.titulo}
								</TitleReport>
								<td>
									<StatusLabel variant={getStatusVariant(d.status)}>
										{d.status}
									</StatusLabel>
								</td>
								<td>{d.data}</td>
								<td>
									<EditButton onClick={() => handleEdit(d.id)}>
										Editar
									</EditButton>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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

const TitleReport = styled.td`
	text-decoration: underline;
	color: #333;
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

const StatusLabel = styled.span<{ variant: "open" | "closed" | "progress" }>`
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

const EditButton = styled.button`
	background: #007bff;
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	z-index: 1;
	position: relative;
`;

const getStatusVariant = (status: string) => {
	if (status === "Em Aberto") return "open";
	if (status === "Fechado") return "closed";
	return "progress";
};
