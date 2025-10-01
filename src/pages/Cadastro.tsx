import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogoWrapper } from '../components/LogoWrapper';
import * as GlobalStyles from '../components/global-styled'

export const Cadastro  = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, sobrenome, cpf, telefone, email, senha });
    navigate('/login');
  };

  return (
    <GlobalStyles.Container>
      <GlobalStyles.Card>
        <LogoWrapper />
        <GlobalStyles.Title>Cadastro</GlobalStyles.Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Nome
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </Label>
          <Label>
            Sobrenome
            <Input
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Sobrenome"
              required
            />
          </Label>
          <Label>
            CPF
            <Input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              required
            />
          </Label>
          <Label>
            Telefone
            <Input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
          </Label>
          <SubmitButton type="submit">Cadastrar</SubmitButton>
        </Form>
        <Footer>
          Já tem uma conta?{' '}
          <LinkButton type="button" onClick={() => navigate('/login')}>
            Fazer Login
          </LinkButton>
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