
import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../utils/productContext';

const Oggettistica: React.FC = () => {
    const { getProductsByCategory } = useProducts();
    const giftItems = getProductsByCategory('oggettistica');

    return (
        <PageLayout title="Oggettistica e Idee Regalo">
            <p className="text-lg text-gray-700 mb-12 max-w-3xl">
                Scopri la nostra selezione di oggetti unici e idee regalo per ogni ricorrenza. Sorprendi chi ami con un pensiero speciale e originale.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {giftItems.length > 0 ? (
                    giftItems.map((product) => (
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

export default Oggettistica;
