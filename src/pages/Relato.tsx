import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { LinkButton, Title } from "../components/global-styled";
import { useReportStore } from "../stores/reportStore";
import { useEffect, useCallback } from "react";
import { ReportStatus } from "../types/report";
import { Base64 } from "js-base64";
import useEmblaCarousel from "embla-carousel-react";

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

export const Relato = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { report, getReportById, photos, getReportPhotos, loading, error } =
		useReportStore();
	const [emblaRef, emblaApi] = useEmblaCarousel();

	useEffect(() => {
		if (id) {
			getReportById(Number(id));
			getReportPhotos(Number(id));
		}
	}, [id, getReportById, getReportPhotos]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	if (loading) {
		return <div>Carregando...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!report) {
		return <div>Relato não encontrado</div>;
	}

	const statusInfo = getStatusInfo(report.status);

	return (
		<Container>
			<Title>Detalhes do Relato</Title>
			<LinkButton onClick={() => navigate(-1)} style={{ margin: "16px 0" }}>
				← Voltar
			</LinkButton>

			<Card>
				{photos.length > 0 && (
					<Embla>
						<EmblaViewport ref={emblaRef}>
							<EmblaContainer>
								{photos.map((photo) => (
									<EmblaSlide key={photo.fileContents}>
										<CarouselImage
											src={Base64.atob(photo.fileContents)}
											alt={`${report.title}`}
										/>
									</EmblaSlide>
								))}
							</EmblaContainer>
						</EmblaViewport>
						{photos.length > 1 && (
							<>
								<PrevButton onClick={scrollPrev}>&#10094;</PrevButton>
								<NextButton onClick={scrollNext}>&#10095;</NextButton>
							</>
						)}
					</Embla>
				)}
				<h3>
					Demanda{" "}
					<StatusLabel variant={statusInfo.variant}>
						{statusInfo.text}
					</StatusLabel>
				</h3>
				<p>
					<strong>{report.title}</strong>
				</p>
				<p>"{report.description}"</p>
			</Card>

			<Card>
				<h3>Localização</h3>
				<p>"{report.localization}"</p>
				<img
					src={`https://via.placeholder.com/400x200.png?text=Mapa+de+${report.localization}`}
					alt="Mapa"
					style={{ width: "100%", borderRadius: "8px" }}
				/>
			</Card>

			<Card>
				{localStorage.getItem("token") || localStorage.getItem("userId") ? (
					<StyledTextarea rows={3} placeholder="Comente..." />
				) : (
					<StyledTextarea
						disabled
						rows={3}
						placeholder="Faça o log-in para comentar"
					/>
				)}
			</Card>
		</Container>
	);
};

const Container = styled.div`
	background: #fff;
	width: 350px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 15px;
`;

const Card = styled.div`
	background: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 10px;
	margin-bottom: 12px;
	h3 {
		margin: 0 0 5px;
		font-size: 1em;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	p {
		margin: 4px 0;
		font-size: 0.85em;
		color: #555;
	}
`;

const Embla = styled.div`
	position: relative;
	margin-bottom: 10px;
`;

const EmblaViewport = styled.div`
	overflow: hidden;
`;

const EmblaContainer = styled.div`
	display: flex;
`;

const EmblaSlide = styled.div`
	flex: 0 0 100%;
	min-width: 0;
`;

const CarouselImage = styled.img`
	width: 100%;
	border-radius: 8px;
	object-fit: cover;
`;

const CarouselButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 50%;
	user-select: none;
	z-index: 1;
`;

const PrevButton = styled(CarouselButton)`
	left: 10px;
`;

const NextButton = styled(CarouselButton)`
	right: 10px;
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 6px;
	font-size: 0.85em;
`;

const StatusLabel = styled.span<{ variant: StatusVariant }>`
	padding: 2px 8px;
	border-radius: 12px;
	color: white;
	font-size: 0.75em;
	background: ${({ variant }) =>
		variant === "open"
			? "#3bb273"
			: variant === "closed"
			? "#c94c4c"
			: "#2f5d8a"};
`;
