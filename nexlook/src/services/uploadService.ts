import { UploadResponse } from "types";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  debugger
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '');  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if(!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    const data = await response.json();
    if(!data.secure_url) {
      throw new Error('URL segura não retornada pelo Cloudinary');
    }
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Falha ao fazer upload da imagem');
  }
};

export const validateImage = (file: File): string | boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    return 'Por favor, selecione apenas arquivos JPG ou PNG.';
  }
    if (file.size > 5 * 1024 * 1024) {
    return 'A imagem deve ter no máximo 5MB.';
  }
  return true;
};

export const uploadToServer = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5147/api/uploadimagem', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Upload failed: ${response.status}`);
    }

    const data = await response.json();
    let uploadResponse: UploadResponse = data;
    return uploadResponse; // URL retornada pelo Cloudinary via backend
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Falha ao fazer upload da imagem');
  }
};
