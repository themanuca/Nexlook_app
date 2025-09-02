import { ClothingItem } from '../types';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

interface OpenAIResponse {
  id: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
}

export const analyzeClothing = async (items: ClothingItem[], userContext: string): Promise<string> => {
  debugger
  if(items.length === 0) {
    return 'Nenhuma peça de roupa selecionada para análise.';
  }

    try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em moda. Analise de roupa e recomende as combinações de roupas e sugira dicas de estilo. Seu diferencial, é que o usará imagens das peças para fazer a análise, essas imagens são fornecidas como URLs. Considere cores, estilos e ocasiões ao fazer suas recomendações."
          },
          {
            role: "user",
            content: [
                {
                    type: "text", 
                    text: `${userContext || 'Analise estas peças de roupa e sugira combinações possíveis,'} considerando cores, estilos e ocasiões.`
                },
                ...items.map((item) => ({
                     type: "image_url",
                     image_url: { url: item.imagem }, // <-- URL do Cloudinary
                   })),
            ]
          },
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    debugger
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${JSON.stringify(errorData)}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing clothing:', error);
    throw new Error('Falha ao analisar as peças de roupa');
  }
};
