import React, { useState } from 'react';
import './styles/global.css';


interface ClothingItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('camisa');
  const [image, setImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    debugger
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nexlookStorage'); // configure este preset no Cloudinary

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/deoxincfe/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Falha ao fazer upload da imagem');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange called');
    const file = e.target.files?.[0];
    if (file) {
      // Preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      try {
        setIsUploading(true);
        const cloudinaryUrl = await uploadToCloudinary(file);
        console.log('Uploaded to Cloudinary:', cloudinaryUrl);
        setImage(cloudinaryUrl);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Erro ao fazer upload da imagem');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    debugger
    e.preventDefault();
    if (name && category && image) {
      const newItem: ClothingItem = {
        id: Math.random().toString(),
        name,
        category,
        image,
      };
      setItems([...items, newItem]);
      setName('');
      setCategory('camisa');
      setImage(null);
      setPreviewImage(null);
    }
  };

  const handleRecommend = () => {
    if (items.length >= 2) {
      // Lógica de recomendação pode ser implementada aqui
      alert('Função de recomendação será implementada em breve!');
    } else {
      alert('Adicione pelo menos 2 peças para receber recomendações!');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Nexlook</h1>
        <p className="subtitle">
          Seu assistente pessoal de moda. Cadastre suas peças e receba recomendações 
          de looks perfeitos para qualquer ocasião.
        </p>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome da peça</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Camisa azul florida"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="camisa">Camisa</option>
              <option value="calca">Calça</option>
              <option value="vestido">Vestido</option>
              <option value="sapato">Sapato</option>
              <option value="acessorio">Acessório</option>
            </select>
          </div>

          <div className="input-group">
            <label>Foto da peça</label>
            <div className="file-input-container">
              <label className="file-input-label">
                {previewImage ? 'Trocar imagem' : 'Escolher imagem'}
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
            {previewImage && (
              <img src={previewImage} alt="Preview" className="preview-image" />
            )}
          </div>

          <button 
            type="submit" 
            className="button" 
            disabled={isUploading}
          >
            {isUploading ? 'Enviando...' : 'Adicionar peça'}
          </button>
        </form>
      </div>

      <div className="items-container">
        <h2 className="items-title">Suas peças</h2>
        {items.length === 0 ? (
          <p className="no-items">
            Você ainda não tem peças cadastradas. Comece adicionando suas roupas favoritas!
          </p>
        ) : (
          <>
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleRecommend} className="recommend-button">
              Receber recomendação de look
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;