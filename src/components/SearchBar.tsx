import React from "react";
import styled from "styled-components";

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	placeholder = "Pesquisar...",
}) => {
	return (
		<Input
			type="text"
			placeholder={placeholder}
			onChange={(e) => onSearch(e.target.value)}
		/>
	);
};

const Input = styled.input`
	width: 100%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
	margin-bottom: 15px;
	font-size: 1em;
	box-sizing: border-box; /* Ensures padding doesn't affect width */

	&:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
	}
`;
