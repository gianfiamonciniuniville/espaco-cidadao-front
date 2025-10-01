import React, { useState } from 'react';
import '../index.css'; 
import { LogoWrapper } from '../components/LogoWrapper';
import { useNavigate } from 'react-router';

interface FormData {
  titulo: string;
  descricao: string;
  foto: File | null;
  endereco: string;
}

export const EdicaoRelato: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    titulo: 'N/D',
    descricao: 'N/D',
    foto: null,
    endereco: 'N/D',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando relato:', formData);
  };

  
  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="edicao-form-container">
      <LogoWrapper />

      <button type="button" className="edicao-voltar-button" onClick={handleVoltar}>
        Voltar
      </button>

      <form onSubmit={handleSubmit} className="edicao-form">
        <div className="edicao-form-field">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="edicao-input-field"
          />
        </div>

        <div className="edicao-form-field">
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="edicao-input-field"
          />
        </div>

        <div className="edicao-form-field">
          <label>Fotos do relato</label>
          <input
            type="file"
            name="foto"
            onChange={handleChange}
            className="edicao-input-file"
          />
        </div>

        <div className="edicao-form-field">
          <label>Localização</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="edicao-input-field"
          />
        </div>

        <button type="submit" className="edicao-submit-button">
          Salvar
        </button>
      </form>
    </div>
  );
};