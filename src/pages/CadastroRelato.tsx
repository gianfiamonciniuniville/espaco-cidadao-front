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

export const CadastroRelato: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    foto: null,
    endereco: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('descricao', formData.descricao);
    data.append('endereco', formData.endereco);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    console.log('Enviando relato:', Object.fromEntries(data.entries()));
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <LogoWrapper />

      <button type="button" className="cadastro-voltar-button" onClick={handleVoltar}>
        Voltar
      </button>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Digite o título do relato"
            className="input-field"
          />
        </div>

        <div className="form-field">
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva seu relato"
            className="input-field"
          />
        </div>

        <div className="form-field">
          <label>Foto</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="input-file"
          />
        </div>

        <div className="form-field">
          <label>Localização</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Digite onde foi relatado"
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
};