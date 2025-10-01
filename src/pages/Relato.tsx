import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";

const demandas = [
	{
		id: 1,
		titulo: "Semáforo queimado",
		status: "Em Aberto",
		data: "20/10/2025",
		descricao: "O semáforo da Rua Principal está queimado.",
		localizacao: "Rua Principal, 123",
		foto: "https://picsum.photos/id/1015/400/250",
	},
	{
		id: 2,
		titulo: "Iluminação na Rua A",
		status: "Fechado",
		data: "21/10/2025",
		descricao: "A iluminação da Rua A está precária.",
		localizacao: "Rua A, 456",
		foto: "https://picsum.photos/id/1031/400/250",
	},
	{
		id: 3,
		titulo: "Buraco na rodovia",
		status: "Em Atendimento",
		data: "20/10/2025",
		descricao: "Há um buraco perigoso na rodovia.",
		localizacao: "Rodovia XYZ, km 10",
		foto: "https://picsum.photos/id/1048/400/250",
	},
	{
		id: 4,
		titulo: "Placa de trânsito caiu",
		status: "Fechado",
		data: "20/10/2025",
		descricao: "A placa de 'Pare' da esquina da Rua B com a Rua C caiu.",
		localizacao: "Esquina da Rua B com a Rua C",
		foto: "https://picsum.photos/id/1059/400/250",
	},
];

export const Relato = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const relato = demandas.find((d) => d.id === Number(id));

	if (!relato) {
		return <div>Relato não encontrado</div>;
	}

	return (
		<Container>
			<LogoWrapper />

			<Title>Detalhes do Relato {relato.id}</Title>
			<LinkButton onClick={() => navigate(-1)} style={{ margin: "16px 0" }}>
				← Voltar
			</LinkButton>

			<Card>
				<img
					src={relato.foto}
					alt={relato.titulo}
					style={{ width: "100%", borderRadius: "8px" }}
				/>
				<h3>
					Demanda <span style={{ float: "right" }}>{relato.data}</span>
				</h3>
				<p>
					<strong>{relato.titulo}</strong>
				</p>
				<p>"{relato.descricao}"</p>
			</Card>

			<Card>
				<h3>Localização</h3>
				<p>"{relato.localizacao}"</p>
				<img
					src={`https://via.placeholder.com/400x200.png?text=Mapa+de+${relato.localizacao}`}
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
