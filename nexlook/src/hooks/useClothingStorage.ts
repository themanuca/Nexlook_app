import { useState, useEffect } from 'react';
import { ClothingItem } from '../types';

const STORAGE_KEY = 'nexlook_items';

export const useClothingStorage = () => {
  const [items, setItems] = useState<ClothingItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: ClothingItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return { items, addItem, removeItem };
};
