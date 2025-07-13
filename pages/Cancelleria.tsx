import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../utils/productContext';

const Cancelleria: React.FC = () => {
    const { getProductsByCategory } = useProducts();
    const stationeryProducts = getProductsByCategory('cancelleria');

    return (
        <PageLayout title="Cancelleria">
            <div className="relative mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6 inline-block">Cancelleria di Qualità</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10">
                    Scopri la nostra selezione di cancelleria di alta qualità. Dai prodotti più classici alle ultime novità, troverai tutto ciò che serve per scrivere, disegnare e creare.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-yellow-500/5 rounded-3xl transform -skew-y-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-3xl -m-6 p-6"></div>
                {stationeryProducts.length > 0 ? (
                    stationeryProducts.map((product) => (
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

export default Cancelleria;