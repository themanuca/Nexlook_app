import React, { useState } from 'react';

const ImageUploader: React.FC<{ onImageUpload: (image: File) => void }> = ({ onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            onImageUpload(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && <p>Imagem selecionada: {selectedImage.name}</p>}
        </div>
    );
};

export default ImageUploader;