import styled from "styled-components";
import { LogoWrapper } from "../components/LogoWrapper";

export const ListaRelatos = () => {
    const demandas = [
        { titulo: "Semáforo queimado", status: "Em Aberto", data: "20/10/2025" },
        { titulo: "Iluminação na Rua A", status: "Fechado", data: "21/10/2025" },
        { titulo: "Buraco na rodovia", status: "Em Atendimento", data: "20/10/2025" },
        { titulo: "Placa de trânsito caiu", status: "Fechado", data: "20/10/2025" },
    ];

    return (
        <Container>
            <LogoWrapper />

            <StatusButtons>
                <StatusButton variant="open">Em Aberto</StatusButton>
                <StatusButton variant="closed">Fechado</StatusButton>
                <StatusButton variant="progress">Em Atendimento</StatusButton>
            </StatusButtons>

            <Demands>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demandas.map((d, i) => (
                            <tr key={i}>
                                <td>{d.titulo}</td>
                                <td>
                                    <StatusLabel variant={getStatusVariant(d.status)}>
                                        {d.status}
                                    </StatusLabel>
                                </td>
                                <td>{d.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Demands>
        </Container>
    );
};

const Container = styled.div`
    background: #fff;
    width: 350px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 15px;
`;

const StatusButtons = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`;

const StatusButton = styled.button<{ variant: "open" | "closed" | "progress" }>`
    border: none;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.8em;
    color: #fff;
    background: ${({ variant }) =>
        variant === "open"
            ? "#3bb273"
            : variant === "closed"
            ? "#c94c4c"
            : "#2f5d8a"};
`;

const Demands = styled.div`
    margin-top: 10px;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        text-align: left;
        padding: 6px;
        font-size: 0.8em;
    }
    th {
        color: #333;
    }
`;

const StatusLabel = styled.span<{ variant: "open" | "closed" | "progress" }>`
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

const getStatusVariant = (status: string) => {
    if (status === "Em Aberto") return "open";
    if (status === "Fechado") return "closed";
    return "progress";
};
