export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  image: string;
}

export type ClothingCategory = 'camisa' | 'calca' | 'vestido' | 'sapato' | 'acessorio';

export const CATEGORIES = {
  camisa: 'Camisa',
  calca: 'Calça',
  vestido: 'Vestido',
  sapato: 'Sapato',
  acessorio: 'Acessório'
} as const;
