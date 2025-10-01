import React, { useState, useEffect } from "react";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as GlobalStyles from "../components/global-styled";

const demandas = [
    { id: 1, titulo: "Semáforo queimado", status: "Em Aberto", data: "20/10/2025", descricao: "O semáforo da Rua Principal está queimado.", endereco: "Rua Principal, 123", foto: "https://picsum.photos/id/1015/400/250" },
    { id: 2, titulo: "Iluminação na Rua A", status: "Fechado", data: "21/10/2025", descricao: "A iluminação da Rua A está precária.", endereco: "Rua A, 456", foto: "https://picsum.photos/id/1031/400/250" },
    { id: 3, titulo: "Buraco na rodovia", status: "Em Atendimento", data: "20/10/2025", descricao: "Há um buraco perigoso na rodovia.", endereco: "Rodovia XYZ, km 10", foto: "https://picsum.photos/id/1048/400/250" },
    { id: 4, titulo: "Placa de trânsito caiu", status: "Fechado", data: "20/10/2025", descricao: "A placa de 'Pare' da esquina da Rua B com a Rua C caiu.", endereco: "Esquina da Rua B com a Rua C", foto: "https://picsum.photos/id/1059/400/250" },
];

interface FormData {
	titulo: string;
	descricao: string;
	foto: File | null;
	endereco: string;
    fotoUrl?: string;
}

export const EdicaoRelato: React.FC = () => {
	const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
	const [formData, setFormData] = useState<FormData>({
		titulo: "",
		descricao: "",
		foto: null,
		endereco: "",
	});

    useEffect(() => {
        const relato = demandas.find(d => d.id === Number(id));
        if (relato) {
            setFormData({ ...relato, foto: null, fotoUrl: relato.foto });
        }
    }, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Salvando relato:", formData);
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<LogoWrapper />

				<GlobalStyles.Title>Edição de Relato</GlobalStyles.Title>

                {formData.fotoUrl && <img src={formData.fotoUrl} alt="Foto do relato" style={{ width: '100%', borderRadius: '8px', marginTop: '16px' }} />}

				<Form onSubmit={handleSubmit}>
					<Label>
						Título
						<Input
							type="text"
							name="titulo"
							value={formData.titulo}
							onChange={handleChange}
						/>
					</Label>

					<Label>
						Descrição
						<Input
							type="text"
							name="descricao"
							value={formData.descricao}
							onChange={handleChange}
						/>
					</Label>

					<Label>
						Nova foto do relato
						<Input type="file" name="foto" onChange={handleChange} />
					</Label>

					<Label>
						Localização
						<Input
							type="text"
							name="endereco"
							value={formData.endereco}
							onChange={handleChange}
						/>
					</Label>

					<GlobalStyles.Button type="submit" variant="filled">
						Salvar
					</GlobalStyles.Button>
				</Form>
				<Footer>
					<GlobalStyles.LinkButton onClick={() => navigate(-1)}>
						Voltar
					</GlobalStyles.LinkButton>
				</Footer>
			</GlobalStyles.Card>
		</GlobalStyles.Container>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
    margin-top: 16px;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	gap: 6px;
	font-size: 14px;
	color: #1f2937;
`;

const Input = styled.input`
	padding: 10px 12px;
	border: 1px solid #d1d5db;
	border-radius: 8px;
	font-size: 14px;
	outline: none;
	&:focus {
		border-color: #009169;
		box-shadow: 0 0 0 2px rgba(0, 145, 105, 0.2);
	}
`;

const Footer = styled.div`
	font-size: 14px;
	text-align: center;
	color: #4b5563;
    margin-top: 16px;
`;
