import React, { useState, useEffect } from "react";
import { LogoWrapper } from "../components/LogoWrapper";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as GlobalStyles from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { ReportStatus, type UpdateReportDto } from "../types/report";

export const EdicaoRelato: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { report, getReportById, updateReport, loading, error } =
		useReportStore();

	const [formData, setFormData] = useState<UpdateReportDto>({
		title: "",
		description: "",
		status: undefined,
	});

	useEffect(() => {
		if (id) {
			getReportById(Number(id));
		}
	}, [id, getReportById]);

	useEffect(() => {
		if (report) {
			setFormData({
				title: report.title,
				description: report.description,
				status: report.status,
			});
		}
	}, [report]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "status" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (id) {
			await updateReport(Number(id), formData);
			if (!error) {
				navigate(`/relato/${id}`);
			}
		}
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<LogoWrapper />

				<GlobalStyles.Title>Edição de Relato</GlobalStyles.Title>

				{loading && !report ? (
					<p>Carregando...</p>
				) : (
					<Form onSubmit={handleSubmit}>
						<Label>
							Título
							<Input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Label>

						<Label>
							Descrição
							<Textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
							/>
						</Label>

						<Label>
							Status
							<Select
								name="status"
								value={formData.status}
								onChange={handleChange}>
								<option value={ReportStatus.Pending}>Em Aberto</option>
								<option value={ReportStatus.InProgress}>Em Andamento</option>
								<option value={ReportStatus.Resolved}>Fechado</option>
							</Select>
						</Label>

						{error && <ErrorMessage>{error}</ErrorMessage>}

						<GlobalStyles.Button
							type="submit"
							variant="filled"
							disabled={loading}>
							{loading ? "Salvando..." : "Salvar"}
						</GlobalStyles.Button>
					</Form>
				)}
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

const Select = styled.select`
	padding: 10px 12px;
	border: 1px solid #d1d5db;
	border-radius: 8px;
	font-size: 14px;
	outline: none;
	background-color: white;
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

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
	text-align: center;
`;
