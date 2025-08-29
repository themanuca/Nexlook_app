import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClothingItem } from '../types';

type ClothingContextType = {
  clothing: ClothingItem[];
  addClothing: (item: ClothingItem) => void;
};

const ClothingContext = createContext<ClothingContextType | undefined>(undefined);

export const useClothing = () => {
  const context = useContext(ClothingContext);
  if (!context) throw new Error('useClothing must be used within ClothingProvider');
  return context;
};

type Props = {
  children: ReactNode;
};

export const ClothingProvider = ({ children }: Props) => {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);

  const addClothing = (item: ClothingItem) => {
    setClothing((prev) => [...prev, item]);
  };

  return (
    <ClothingContext.Provider value={{ clothing, addClothing }}>
      {children}
    </ClothingContext.Provider>
  );
};