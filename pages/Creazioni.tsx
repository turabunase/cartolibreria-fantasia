
import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../utils/productContext';

const Creazioni: React.FC = () => {
    const { getProductsByCategory } = useProducts();
    const creativeItems = getProductsByCategory('creazioni');

    return (
        <PageLayout title="Creazioni e Fai da Te">
            <p className="text-lg text-gray-700 mb-12 max-w-3xl">
                Libera la tua fantasia con i nostri materiali per hobbistica e creazioni. Realizziamo anche articoli personalizzati per i tuoi eventi speciali.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {creativeItems.length > 0 ? (
                    creativeItems.map((product) => (
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

export default Creazioni;
