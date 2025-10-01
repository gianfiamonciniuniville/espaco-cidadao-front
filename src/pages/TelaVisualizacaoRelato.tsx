import React, { useState } from 'react';
import '../index.css';

interface Relato {
  titulo: string;
  descricao: string;
  foto: string;
  endereco: string;
  mapa: string;
}

export const VisualizacaoRelato: React.FC = () => {
  const [status, setStatus] = useState<'em_aberto' | 'em_andamento' | 'concluido'>('em_aberto');

  const relato: Relato = {
    titulo: 'Buraco na rua',
    descricao: 'Há um buraco grande na esquina da Rua das Flores com a Avenida Central.',
    foto: 'https://via.placeholder.com/400x250?text=Foto+do+Relato',
    endereco: 'Rua das Flores, nº 123 - Centro, Cidade X',
    mapa: 'https://via.placeholder.com/400x200?text=Mapa+Aqui',
  };

  const statusLabels: Record<typeof status, string> = {
    em_aberto: 'Em Aberto',
    em_andamento: 'Em Andamento',
    concluido: 'Concluído',
  };

  const devolutivas: Record<typeof status, string> = {
    em_aberto: 'Ainda não há devolutiva.',
    em_andamento: 'Ocorrência em andamento. Estamos trabalhando para solucionar o problema.',
    concluido: 'Ocorrência finalizada. Agradecemos pelo seu relato.',
  };

  const handleVoltar = () => {
    console.log('Voltar clicado');
  };

  const handleEditarStatus = () => {
    const next =
      status === 'em_aberto'
        ? 'em_andamento'
        : status === 'em_andamento'
        ? 'concluido'
        : 'em_aberto';
    setStatus(next);
  };

  return (
    <div className="form-container">
      <header className="header">
        <h1>
          <img
            src="https://i.ibb.co/s9k1gX0H/icon-site.png"
            alt="Ícone do site"
            className="icon"
          />
          Espaço <br /> Cidadão
        </h1>
        <h3 className="form-title">Visualização do Relato</h3>
      </header>

      <button type="button" className="cadastro-voltar-button" onClick={handleVoltar}>
        Voltar
      </button>

      <div className="relato-container">
        {/* Status e botão editar */}
        <div className="status-container">
          <span className={`status-badge status-${status}`}>{statusLabels[status]}</span>
          <button type="button" className="editar-button" onClick={handleEditarStatus}>
            Editar Status
          </button>
        </div>

        {/* Detalhes */}
        <h2 className="relato-title">{relato.titulo}</h2>
        <p className="relato-desc">{relato.descricao}</p>

        <img src={relato.foto} alt="Foto do relato" className="relato-foto" />

        <p className="relato-endereco">{relato.endereco}</p>
        <img src={relato.mapa} alt="Mapa" className="relato-mapa" />

        <h3 className="relato-devolutiva">Devolutiva:</h3>
        <p>{devolutivas[status]}</p>
      </div>
    </div>
  );
};