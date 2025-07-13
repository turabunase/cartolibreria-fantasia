
import React from 'react';

interface ProductCardProps {
    imageUrl: string;
    title: string;
    description: string;
    price?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description, price }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 ease-in-out group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <div className="overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-yellow-500/10"></div>
                <img className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" src={imageUrl} alt={title} />
            </div>
            <div className="p-6 relative z-20">
                <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-3">{title}</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">{description}</p>
                {price && (
                    <p className="text-xl font-bold text-pink-600 mb-4">€ {price}</p>
                )}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-semibold text-sm transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">Scopri di più</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
