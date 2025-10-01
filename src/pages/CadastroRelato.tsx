import React, { useState } from "react";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate } from "react-router";
import * as GlobalStyles from "../components/global-styled";
import styled from "styled-components";

interface FormData {
	titulo: string;
	descricao: string;
	foto: File | null;
	endereco: string;
}

export const CadastroRelato: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
		titulo: "",
		descricao: "",
		foto: null,
		endereco: "",
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

		const data = new FormData();
		data.append("titulo", formData.titulo);
		data.append("descricao", formData.descricao);
		data.append("endereco", formData.endereco);
		if (formData.foto) {
			data.append("foto", formData.foto);
		}

		console.log("Enviando relato:", Object.fromEntries(data.entries()));
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<LogoWrapper />

				<GlobalStyles.Title>Novo Relato</GlobalStyles.Title>

				<Form onSubmit={handleSubmit}>
					<Label>
						Título
						<Input
							type="text"
							name="titulo"
							value={formData.titulo}
							onChange={handleChange}
							placeholder="Digite o título do relato"
							required
						/>
					</Label>

					<Label>
						Descrição
						<Input
							type="text"
							name="descricao"
							value={formData.descricao}
							onChange={handleChange}
							placeholder="Descreva seu relato"
							required
						/>
					</Label>

					<Label>
						Foto
						<Input
							type="file"
							name="foto"
							accept="image/*"
							onChange={handleChange}
						/>
					</Label>

					<Label>
						Localização
						<Input
							type="text"
							name="endereco"
							value={formData.endereco}
							onChange={handleChange}
							placeholder="Digite onde foi relatado"
							required
						/>
					</Label>

					<GlobalStyles.Button
						type="submit"
						disabled={
							!formData.titulo || !formData.descricao || !formData.endereco
						}
						variant="filled">
						Enviar
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
