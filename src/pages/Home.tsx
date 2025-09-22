import { useNavigate } from "react-router";
import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";


export const Home = () => {
  const navigate = useNavigate();

    return (
      <Container>
      <Card>
        <LogoWrapper />

        <Title>Bem-vindo ao Espaço Cidadão</Title>

        <Description>
          Uma plataforma para reportar problemas e sugerir melhorias para os
          espaços públicos
        </Description>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => navigate('/cadastro-relato')}>Começar a postar</Button>
          <Button onClick={() => navigate('/login')}>Log-in</Button>
        </div>
      </Card>
    </Container>
    )
}

const Container = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: white;
  width: 360px;
  padding: 32px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 32px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0 0 32px 0;
`;

const Button = styled.button`
  background-color: #009169;
  color: white;
  font-size: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #007a58;
  }
`;