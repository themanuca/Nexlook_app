import React from 'react';
import { ClothingItem } from '../types';

type Props = {
  items: ClothingItem[];
};

const OutfitRecommendation: React.FC<Props> = ({ items }) => {
  if (!items.length) return <p>Nenhuma recomendação disponível.</p>;
  return (
    <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
      {items.map(item => (
        <div key={item.id} style={{ border: '1px solid #aaa', borderRadius: 8, padding: 8, width: 120 }}>
          <img src={item.imagem} alt={item.nome} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }} />
          <div><b>{item.nome}</b></div>
          <div style={{ fontSize: 12 }}>{item.categoria}</div>
        </div>
      ))}
    </div>
  );
};
export default OutfitRecommendation;