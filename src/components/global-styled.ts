import styled from "styled-components";

export const Container = styled.div`
	--bg: #f3f3f3;
	background-color: var(--bg);
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 24px;
`;

export const Card = styled.div`
	background-color: #ffffff;
	width: 100%;
	max-width: 420px;
	padding: 32px 20px;
	border-radius: 12px;
	box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 20px;
`;

export const Title = styled.h2`
	font-size: 20px;
	font-weight: 700;
	color: #1f2937;
	margin: 0;
	text-align: center;
`;

export const Button = styled.button<{
	variant?: "filled" | "outline";
}>`
	background-color: ${({ variant }) =>
		variant === "filled" ? "#009169" : "transparent"};
	color: ${({ variant }) => (variant === "filled" ? "white" : "#009169")};
	font-size: 16px;
	padding: 10px 24px;
	border: ${({ variant }) =>
		variant === "outline" ? "2px solid #009169" : "none"};
	border-radius: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${({ variant }) =>
			variant === "filled" ? "#007a58" : "transparent"};
		color: ${({ variant }) => (variant === "filled" ? "white" : "#007a58")};
	}
`;

export const LinkButton = styled.button`
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
