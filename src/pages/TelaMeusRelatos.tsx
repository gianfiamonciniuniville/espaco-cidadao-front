import React from 'react';
import '../index.css';

interface Relato {
  id: number;
  titulo: string;
  descricao: string;
  status: 'em_aberto' | 'em_andamento' | 'concluido';
}

export const MeusRelatos: React.FC = () => {
  const relatos: Relato[] = [
    {
      id: 1,
      titulo: 'Buraco na rua',
      descricao: 'Há um buraco grande na esquina da Rua das Flores com a Avenida Central.',
      status: 'em_aberto',
    },
    {
      id: 2,
      titulo: 'Semáforo apagado',
      descricao: 'O semáforo próximo ao mercado está sem funcionar desde ontem.',
      status: 'em_andamento',
    },
    {
      id: 3,
      titulo: 'Poste caído',
      descricao: 'Um poste caiu durante a tempestade no bairro Nova Esperança.',
      status: 'concluido',
    },
  ];

  const statusLabels: Record<Relato['status'], string> = {
    em_aberto: 'Em Aberto',
    em_andamento: 'Em Atendimento',
    concluido: 'Concluído',
  };

  const handleVoltar = () => {
    console.log('Voltar clicado');
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
        <h3 className="form-title">Meus Relatos</h3>
      </header>

      <button type="button" className="cadastro-voltar-button" onClick={handleVoltar}>
        Voltar
      </button>

      <div className="relatos-list">
        {relatos.map((relato) => (
          <div key={relato.id} className="relato-card">
            <h4 className="relato-titulo">{relato.titulo}</h4>
            <p className="relato-descricao">{relato.descricao}</p>
            <div className={`status-badge status-${relato.status}`}>
              {statusLabels[relato.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};