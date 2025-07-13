import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import AdminRegistration from '../components/AdminRegistration';
import { useProducts } from '../utils/productContext';

const Home: React.FC = () => {
    const { getFeaturedProducts } = useProducts();
    const featuredProducts = getFeaturedProducts();

    return (
        <PageLayout title="Home">
            <div className="relative mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6 inline-block">Benvenuti alla Cartolibreria Fantasia</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10">
                    Scopri il nostro mondo di colori, creatività e fantasia. Dai materiali scolastici agli articoli per le belle arti, abbiamo tutto ciò che serve per dare vita alle tue idee.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-yellow-500/5 rounded-3xl transform -skew-y-2"></div>
            </div>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Prodotti in Evidenza</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-3xl -m-6 p-6"></div>
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
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
                            <p className="text-xl text-gray-600">Nessun prodotto in evidenza al momento.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Vieni a Trovarci</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                    Siamo aperti dal lunedì al sabato, dalle 9:00 alle 19:00. Il nostro staff sarà felice di aiutarti a trovare esattamente ciò che cerchi.
                </p>
                <div className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 p-[2px] rounded-full">
                    <button className="px-8 py-3 bg-white rounded-full hover:bg-transparent hover:text-white transition-colors duration-300">
                        Contattaci
                    </button>
                </div>
            </section>

            <AdminRegistration />
        </PageLayout>
    );
};

export default Home;