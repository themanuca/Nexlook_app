import { ClothingItem } from '../types';

// Exemplo: retorna uma combinação aleatória de duas peças de categorias diferentes
export function getOutfitRecommendation(clothing: ClothingItem[]): ClothingItem[] {
  if (clothing.length < 2) return [];
  // Agrupa por categoria
  const byCategory: { [cat: string]: ClothingItem[] } = {};
  clothing.forEach(item => {
    if (!byCategory[item.categoria]) byCategory[item.categoria] = [];
    byCategory[item.categoria].push(item);
  });
  const categorias = Object.keys(byCategory);
  if (categorias.length < 2) return [];
  // Pega duas categorias diferentes
  const [cat1, cat2] = categorias.slice(0, 2);
  const item1 = byCategory[cat1][Math.floor(Math.random() * byCategory[cat1].length)];
  const item2 = byCategory[cat2][Math.floor(Math.random() * byCategory[cat2].length)];
  return [item1, item2];
}