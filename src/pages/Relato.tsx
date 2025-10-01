import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";

export const Relato = () => {
    return (
        <>
            <Container>
                <LogoWrapper />

                <Back>← Voltar</Back>

                <Card>
                    <h3>
                        Demanda <span style={{ float: "right" }}>20/10/2025</span>
                    </h3>
                    <p>
                        <strong>Semáforo queimado</strong>
                    </p>
                    <p>"descrição do problema"</p>
                    <SignalImg
                        src="https://cdn-icons-png.flaticon.com/512/483/483947.png"
                        alt="Semáforo"
                    />
                </Card>

                <Card>
                    <h3>Localização</h3>
                    <p>"Rua do lado de outra rua"</p>
                    <MapImg
                        src="https://via.placeholder.com/300x100.png?text=Mapa"
                        alt="Mapa"
                    />
                </Card>

                <Actions>
                    <Button variant="approve" className="btn-approve">
                        Aprovar
                    </Button>
                    <Button variant="reject" className="btn-reject">
                        Rejeitar
                    </Button>
                </Actions>

                <StyledTextarea rows={3} placeholder="Escreva sua devolutiva..." />
            </Container>
        </>
    );
};

const Container = styled.div`
    background: #fff;
    width: 350px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 15px;
`;

const Back = styled.div`
    margin: 5px 0;
    font-size: 0.9em;
    color: #2f5d8a;
    cursor: pointer;
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
    }
    p {
        margin: 4px 0;
        font-size: 0.85em;
        color: #555;
    }
`;

const SignalImg = styled.img`
    width: 40px;
    float: right;
`;

const MapImg = styled.img`
    width: 100%;
    border-radius: 6px;
    margin-top: 6px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`;

const Button = styled.button<{ variant: "approve" | "reject" }>`
    border: none;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.8em;
    cursor: pointer;
    color: #fff;
    background: ${({ variant }) =>
        variant === "approve" ? "#3bb273" : "#c94c4c"};
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px;
    font-size: 0.85em;
`;
