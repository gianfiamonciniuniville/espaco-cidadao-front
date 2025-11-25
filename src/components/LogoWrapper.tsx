import styled from "styled-components";

export const LogoWrapper = () => {
	return (
		<LogoWrap>
			<LogoImage src="logo.png" alt="Espaço Cidadão" />
		</LogoWrap>
	);
};

const LogoWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LogoImage = styled.img`
	width: 182px;
	object-fit: contain;
`;
