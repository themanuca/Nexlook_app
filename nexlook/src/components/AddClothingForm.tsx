import React, { useState } from 'react';
import { useClothing } from '../contexts/ClothingContext';
import { ClothingCategory, ClothingItem } from '../types';

const categorias: ClothingCategory[] = ['camisa', 'calça', 'short', 'saia', 'jaqueta', 'outro'];

const AddClothingForm: React.FC = () => {
  const { addClothing } = useClothing();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<ClothingCategory>('camisa');
  const [imagem, setImagem] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result ? reader.result.toString() : '');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !imagem) return;
    const item: ClothingItem = {
      id: Date.now().toString(),
      nome,
      categoria,
      imagem,
    };
    addClothing(item);
    setNome('');
    setImagem('');
    setCategoria('camisa');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input
        type="text"
        placeholder="Nome da peça"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <select 
        value={categoria} 
        onChange={e => setCategoria(e.target.value as ClothingCategory)}>
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      {imagem && <img src={imagem} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover' }} />}
      <button type="submit">Adicionar peça</button>
    </form>
  );
};

export default AddClothingForm;