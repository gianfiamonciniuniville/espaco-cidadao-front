import styled from "styled-components";

export const Home = () => {
    return (
      <Container>
      <Card>
        <LogoWrapper>
          <LogoImage src="/logo.png" alt="Espaço Cidadão" />
          <LogoText>Espaço Cidadão</LogoText>
        </LogoWrapper>

        <Title>Bem-vindo ao Espaço Cidadão</Title>

        <Description>
          Uma plataforma para reportar problemas e sugerir melhorias para os
          espaços públicos
        </Description>

        <Button onClick={() => console.log("Começar clicado")}>Começar</Button>
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

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoText = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #004b5f;
  margin: 0;
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