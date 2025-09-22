import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogoWrapper } from '../components/LogoWrapper';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, senha });
    navigate('/mapa');
  };

  return (
    <Wrapper>
      <Card>
        <LogoWrapper />
        <Title>Login</Title>
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </Label>
          <SubmitButton type="submit">Entrar</SubmitButton>
        </Form>
        <Footer>
          Não tem uma conta?{' '}
          <LinkButton type="button" onClick={() => navigate('/cadastro')}>
            Criar Conta
          </LinkButton>
        </Footer>
      </Card>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  --bg: #f3f3f3;
  background-color: var(--bg);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Card = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 380px;
  padding: 32px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  text-align: center;
`;

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

const SubmitButton = styled.button`
  background-color: #009169;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #007a58;
  }
`;

const Footer = styled.div`
  font-size: 14px;
  text-align: center;
  color: #4b5563;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #009169;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;