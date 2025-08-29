export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.src = event.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], file.name, { type: file.type }));
                } else {
                    reject(new Error('Failed to create blob from canvas'));
                }
            }, file.type);
        };

        img.onerror = (error) => {
            reject(new Error('Failed to load image: ' + error));
        };

        reader.onerror = (error) => {
            reject(new Error('Failed to read file: ' + error));
        };

        reader.readAsDataURL(file);
    });
};

export const validateImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB limit
};