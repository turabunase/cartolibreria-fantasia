import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../utils/productContext';

const BelleArti: React.FC = () => {
    const { getProductsByCategory } = useProducts();
    const artProducts = getProductsByCategory('belle_arti');

    return (
        <PageLayout title="Belle Arti">
            <div className="relative mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6 inline-block">Belle Arti</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10">
                    Esplora la nostra collezione di materiali per le belle arti. Dalle tele ai colori professionali, tutto ciò che serve per dare vita alla tua creatività.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-yellow-500/5 rounded-3xl transform -skew-y-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-3xl -m-6 p-6"></div>
                {artProducts.length > 0 ? (
                    artProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.name}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            price={product.price}
                        />
                    ))
                ) : (
                    <div className="col-span-4 text-center py-12">
                        <p className="text-xl text-gray-600">Nessun prodotto disponibile al momento.</p>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default BelleArti;