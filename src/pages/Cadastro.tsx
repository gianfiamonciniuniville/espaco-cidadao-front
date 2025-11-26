import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as GlobalStyles from "../components/global-styled";
import { useUserStore } from "../stores/userStore";

export const Cadastro = () => {
	const navigate = useNavigate();
	const { registerUser, loading, error } = useUserStore();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [document, setDocument] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await registerUser({
			firstName,
			lastName,
			document,
			phone,
			email,
			password,
		});
		if (!error) {
			navigate("/login");
		}
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<GlobalStyles.Title>Cadastro</GlobalStyles.Title>
				<Form onSubmit={handleSubmit}>
					<Label>
						Nome
						<Input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Nome"
							required
						/>
					</Label>
					<Label>
						Sobrenome
						<Input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Sobrenome"
							required
						/>
					</Label>
					<Label>
						CPF
						<Input
							type="text"
							value={document}
							onChange={(e) => setDocument(e.target.value)}
							placeholder="000.000.000-00"
							required
						/>
					</Label>
					<Label>
						Telefone
						<Input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="(DDD) Telefone"
							required
						/>
					</Label>
					<Label>
						Email
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							required
						/>
					</Label>
					<Label>
						Senha
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Senha"
							required
						/>
					</Label>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<GlobalStyles.Button
						type="submit"
						variant="filled"
						disabled={loading}>
						{loading ? "Cadastrando..." : "Cadastrar"}
					</GlobalStyles.Button>
				</Form>
				<Footer>
					Já tem uma conta?{" "}
					<GlobalStyles.LinkButton
						type="button"
						onClick={() => navigate("/login")}>
						Fazer Login
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

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
	text-align: center;
`;
