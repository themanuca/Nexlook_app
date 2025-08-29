import React from 'react';
import { useClothing } from '../contexts/ClothingContext';

const ClothingList: React.FC = () => {
  const { clothing } = useClothing();
  if (clothing.length === 0) return <p>Nenhuma peça cadastrada.</p>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {clothing.map(item => (
        <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 8, width: 120 }}>
          <img src={item.imagem} alt={item.nome} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }} />
          <div><b>{item.nome}</b></div>
          <div style={{ fontSize: 12 }}>{item.categoria}</div>
        </div>
      ))}
    </div>
  );
};

export default ClothingList;