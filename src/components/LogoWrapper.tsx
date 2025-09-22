import styled from 'styled-components';

export const LogoWrapper = () => {
    return (
        <LogoWrap>
          <LogoImage src="/src/assets/logo.png" alt="Espaço Cidadão" />
        </LogoWrap>
    );
}

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 64px;
`;

const LogoImage = styled.img`
  width: 182px;
  object-fit: contain;
`;