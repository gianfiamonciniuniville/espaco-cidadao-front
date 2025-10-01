import React, { useState } from "react";
import "../index.css";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate } from "react-router";
import styled from "styled-components";
import * as GlobalStyles from "../components/global-styled";

interface FormData {
	titulo: string;
	descricao: string;
	foto: File | null;
	endereco: string;
}

export const EdicaoRelato: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
		titulo: "N/D",
		descricao: "N/D",
		foto: null,
		endereco: "N/D",
	});

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
						Fotos do relato
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
					<GlobalStyles.LinkButton onClick={() => navigate("/")}>
						Voltar para Inicio
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
`;
