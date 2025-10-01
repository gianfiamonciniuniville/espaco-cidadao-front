import React from 'react';
import '../index.css';

export const TelaLocalizacao: React.FC = () => {
  const handleNovoRelato = () => {
    console.log('Ir para Novo Relato');
  };

  const handleMeusRelatos = () => {
    console.log('Ir para Meus Relatos');
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
        <h3 className="form-title">Olá, bem-vindo!</h3>
      </header>

      <div className="mapa-container">
        <h4 className="mapa-subtitulo">Sua localização</h4>
        <img
          src="https://via.placeholder.com/400x250?text=Mapa+Aqui"
          alt="Mapa da localização"
          className="mapa-imagem"
        />
      </div>

      <div className="botoes-container">
        <button className="menu-button" onClick={handleNovoRelato}>
          Novo Relato
        </button>
        <button className="menu-button" onClick={handleMeusRelatos}>
          Meus Relatos
        </button>
      </div>
    </div>
  );
};