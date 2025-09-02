import React, { useState } from 'react';
import { ClothingItem } from '../types';
import { analyzeClothing } from '../services/openaiService';

interface OutfitAnalyzerProps {
  selectedItems: ClothingItem[];
}

export const OutfitAnalyzer: React.FC<OutfitAnalyzerProps> = ({ selectedItems }) => {
  const [userContext, setUserContext] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (selectedItems.length === 0) {
      setError('Por favor, selecione pelo menos uma peça de roupa.');
      return;
    }

    setIsLoading(true);
    setError('');
    debugger
    try {
      const result = await analyzeClothing(selectedItems, userContext);
      setRecommendation(result);
    } catch (err) {
      setError('Erro ao analisar as roupas. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="outfit-analyzer">
      <div className="input-section">
        <textarea
          value={userContext}
          onChange={(e) => setUserContext(e.target.value)}
          placeholder="Descreva o que você está procurando... (ex: Preciso de uma combinação para um jantar formal, Quero um look casual para o fim de semana)"
          rows={3}
          className="context-input"
        />
        <button 
          onClick={handleAnalyze}
          disabled={isLoading}
          className="analyze-button"
        >
          {isLoading ? 'Analisando...' : 'Receber recomendação de look'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {recommendation && (
        <div className="recommendation-section">
          <h3>Sugestões:</h3>
          <p>{recommendation}</p>
        </div>
      )}

      <style>{`
        .outfit-analyzer {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .input-section {
          margin-bottom: 20px;
        }

        .context-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
          font-size: 16px;
          resize: vertical;
        }

        .analyze-button {
          background-color: #0066cc;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .analyze-button:hover {
          background-color: #0052a3;
        }

        .analyze-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #dc3545;
          margin: 10px 0;
        }

        .recommendation-section {
          margin-top: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }

        .recommendation-section h3 {
          margin-top: 0;
          color: #333;
        }
      `}</style>
    </div>
  );
};
