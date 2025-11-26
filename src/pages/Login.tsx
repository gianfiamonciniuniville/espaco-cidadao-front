import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as GlobalStyles from "../components/global-styled";
import { useUserStore } from "../stores/userStore";

export const Login = () => {
	const navigate = useNavigate();
	const { loginUser, token, loading, error } = useUserStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (token) {
			navigate("/mapa");
		}
	}, [token, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await loginUser({ email, password });
		if (success) {
			navigate("/mapa");
		}
	};

	return (
		<GlobalStyles.Container>
			<GlobalStyles.Card>
				<GlobalStyles.Title>Login</GlobalStyles.Title>
				<Form onSubmit={handleSubmit}>
					<Label>
						Email
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email"
							required
						/>
					</Label>
					<Label>
						Senha
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha"
							required
						/>
					</Label>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<GlobalStyles.Button
						type="submit"
						variant="filled"
						disabled={loading}>
						{loading ? "Entrando..." : "Entrar"}
					</GlobalStyles.Button>
				</Form>
				<Footer>
					Não tem uma conta?{" "}
					<GlobalStyles.LinkButton
						type="button"
						onClick={() => navigate("/cadastro")}>
						Criar Conta
					</GlobalStyles.LinkButton>
				</Footer>
			</GlobalStyles.Card>
		</GlobalStyles.Container>
	);
};

export default Login;

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
