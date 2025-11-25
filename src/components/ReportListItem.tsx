import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReportStatus } from "../types/report";
import type { Report } from "../types/report";
import { getReportPhotos } from "../services/reportService";
import type { ReportPhoto } from "../types/report";
import { Base64 } from "js-base64";

interface ReportListItemProps {
	report: Report;
	onClick: () => void;
	onEdit?: () => void;
}

type StatusVariant = "open" | "closed" | "progress";

const getStatusInfo = (
	status: ReportStatus
): { text: string; variant: StatusVariant } => {
	switch (status) {
		case ReportStatus.Pending:
			return { text: "Em Aberto", variant: "open" };
		case ReportStatus.Resolved:
			return { text: "Fechado", variant: "closed" };
		case ReportStatus.InProgress:
			return { text: "Andamento", variant: "progress" };
		default:
			return { text: "Desconhecido", variant: "progress" };
	}
};

export const ReportListItem = ({
	report,
	onClick,
	onEdit,
}: ReportListItemProps) => {
	const [photo, setPhoto] = useState<ReportPhoto | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPhoto = async () => {
			try {
				const photos = await getReportPhotos(report.id);
				if (photos.length > 0) {
					setPhoto(photos[0]);
				}
			} catch (error) {
				console.error("Error fetching report photo:", error);
			} finally {
				setLoading(false);
			}
		};

		if (report.photosCount > 0) {
			fetchPhoto();
		} else {
			setLoading(false);
		}
	}, [report.id, report.photosCount]);

	const statusInfo = getStatusInfo(report.status);

	return (
		<Card onClick={onClick}>
			{loading ? (
				<NoImage>Carregando...</NoImage>
			) : photo ? (
				<ReportImage src={Base64.atob(photo.fileContents)} alt={report.title} />
			) : (
				<NoImage>Sem imagem</NoImage>
			)}
			<ReportInfo>
				<Title>{report.title}</Title>
				<StatusLabel variant={statusInfo.variant}>
					{statusInfo.text}
				</StatusLabel>
			</ReportInfo>
			{onEdit && (
				<EditButton
					onClick={(e) => {
						e.stopPropagation();
						onEdit();
					}}>
					Editar
				</EditButton>
			)}
		</Card>
	);
};

const Card = styled.div`
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	transition: box-shadow 0.2s;

	&:hover {
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}
`;

const ReportImage = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 5px;
	object-fit: cover;
	margin-right: 15px;
`;

const NoImage = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 5px;
	margin-right: 15px;
	background: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999;
	font-size: 0.8em;
	text-align: center;
`;

const ReportInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h4`
	margin: 0 0 10px 0;
	color: #333;
`;

const StatusLabel = styled.span<{ variant: "open" | "closed" | "progress" }>`
	padding: 3px 8px;
	border-radius: 12px;
	color: white;
	font-size: 0.8em;
	align-self: flex-start;
	background: ${({ variant }) =>
		variant === "open"
			? "#3bb273"
			: variant === "closed"
			? "#c94c4c"
			: "#2f5d8a"};
`;

const EditButton = styled.button`
	background: #007bff;
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	margin-left: auto;
`;
