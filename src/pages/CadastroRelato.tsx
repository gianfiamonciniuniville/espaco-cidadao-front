import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as GlobalStyles from "../components/global-styled";
import styled from "styled-components";
import { useReportStore } from "../stores/reportStore";
import type { CreateReportDto } from "../types/report";

export const CadastroRelato: React.FC = () => {
	const navigate = useNavigate();
	const { createReport, loading, error } = useReportStore();
	const [formData, setFormData] = useState<CreateReportDto>({
		UserId: Number(localStorage.getItem("userId")) || 0,
		Title: "",
		Description: "",
		Localization: "",
		Photos: [],
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData((prev) => ({
				...prev,
				Photos: e.target.files ? Array.from(e.target.files) : [],
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createReport(formData);
		if (!error) {
			navigate("/meus-relatos");
		}
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<GlobalStyles.Title>Novo Relato</GlobalStyles.Title>

				<Form onSubmit={handleSubmit}>
					<Label>
						Título
						<Input
							type="text"
							name="Title"
							value={formData.Title}
							onChange={handleChange}
							placeholder="Digite o título do relato"
							required
						/>
					</Label>

					<Label>
						Descrição
						<Textarea
							name="Description"
							value={formData.Description}
							onChange={handleChange}
							placeholder="Descreva seu relato"
							required
						/>
					</Label>

					<Label>
						Fotos
						<Input
							type="file"
							name="Photos"
							accept="image/*"
							multiple
							onChange={handleFileChange}
						/>
					</Label>

					<Label>
						Localização
						<Input
							type="text"
							name="Localization"
							value={formData.Localization}
							onChange={handleChange}
							placeholder="Digite onde foi relatado"
							required
						/>
					</Label>

					{error && <ErrorMessage>{error}</ErrorMessage>}

					<GlobalStyles.Button
						type="submit"
						disabled={
							!formData.Title ||
							!formData.Description ||
							!formData.Localization ||
							loading
						}
						variant="filled">
						{loading ? "Enviando..." : "Enviar"}
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

const Textarea = styled.textarea`
	padding: 10px 12px;
	border: 1px solid #d1d5db;
	border-radius: 8px;
	font-size: 14px;
	outline: none;
	resize: vertical;
	min-height: 80px;
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

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
	text-align: center;
`;
