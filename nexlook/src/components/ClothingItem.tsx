import React from 'react';

interface ClothingItemProps {
    imageUrl: string;
    description: string;
    category: string;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ imageUrl, description, category }) => {
    return (
        <div className="clothing-item">
            <img src={imageUrl} alt={description} className="clothing-image" />
            <div className="clothing-details">
                <h3>{description}</h3>
                <p>Category: {category}</p>
            </div>
        </div>
    );
};

export default ClothingItem;