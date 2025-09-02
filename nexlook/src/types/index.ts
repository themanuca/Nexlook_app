export type ClothingCategory = 'camisa' | 'calça' | 'short' | 'saia' | 'jaqueta' | 'outro';

export type ClothingItem = {
  id: string;
  nome: string;
  categoria: ClothingCategory;
  imagem: string; // base64 ou url local
};

export interface Recommendation {
    outfitId: string;
    items: ClothingItem[];
    context: string;
}
export interface UploadResponse {
  imageUrl: string;
  id: string;
  success: boolean;
  message?: string;
}