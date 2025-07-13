
import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../utils/productContext';

const Scuola: React.FC = () => {
    const { getProductsByCategory } = useProducts();
    const schoolProducts = getProductsByCategory('scuola');

    return (
        <PageLayout title="Per la Scuola">
            <div className="relative mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6 inline-block">Tutto per la Scuola</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10">
                    Tutto il necessario per affrontare l'anno scolastico con stile e organizzazione. Dai libri di testo agli accessori più divertenti, abbiamo ciò che fa per te.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-yellow-500/5 rounded-3xl transform -skew-y-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-3xl -m-6 p-6"></div>
                {schoolProducts.length > 0 ? (
                    schoolProducts.map((product) => (
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

export default Scuola;
