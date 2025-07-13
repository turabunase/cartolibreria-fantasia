import React, { useState } from 'react';
import { useProducts } from '../utils/productContext';
import ProductForm from '../components/ProductForm';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    featured: boolean;
}

const ProductManagement: React.FC = () => {
    const { products, deleteProduct, updateProduct } = useProducts();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const categories = ['all', 'scuola', 'cancelleria', 'belle_arti', 'oggettistica', 'creazioni'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = (productId: string) => {
        if (confirmDelete === productId) {
            deleteProduct(productId);
            setConfirmDelete(null);
        } else {
            setConfirmDelete(productId);
        }
    };

    const handleSaveProduct = (productData: any) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        }
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setEditingProduct(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500">
                    Gestione Prodotti
                </h1>

                {/* Filtri e Ricerca */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cerca prodotti
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nome o descrizione..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoria
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'Tutte le categorie' : 
                                         cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Nuovo Prodotto
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistiche */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-2xl font-bold text-purple-600">{products.length}</div>
                        <div className="text-gray-600">Prodotti Totali</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {products.filter(p => p.featured).length}
                        </div>
                        <div className="text-gray-600">In Evidenza</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {filteredProducts.length}
                        </div>
                        <div className="text-gray-600">Filtrati</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-2xl font-bold text-pink-600">
                            {new Set(products.map(p => p.category)).size}
                        </div>
                        <div className="text-gray-600">Categorie</div>
                    </div>
                </div>

                {/* Lista Prodotti */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Immagine</th>
                                    <th className="px-6 py-4 text-left">Nome</th>
                                    <th className="px-6 py-4 text-left">Categoria</th>
                                    <th className="px-6 py-4 text-left">Prezzo</th>
                                    <th className="px-6 py-4 text-left">Evidenza</th>
                                    <th className="px-6 py-4 text-left">Azioni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map((product, index) => (
                                    <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/api/placeholder/64/64';
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                {product.category.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-green-600">
                                            €{product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.featured ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ⭐ Sì
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                                    No
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                                >
                                                    Modifica
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                        confirmDelete === product.id
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-red-500 text-white hover:bg-red-600'
                                                    }`}
                                                >
                                                    {confirmDelete === product.id ? 'Conferma?' : 'Elimina'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-6xl mb-4">📦</div>
                            <div className="text-xl font-semibold mb-2">Nessun prodotto trovato</div>
                            <div>Prova a modificare i filtri di ricerca</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal per Form Prodotto */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500">
                                    {editingProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
                                </h2>
                                <button
                                    onClick={handleCloseForm}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <ProductForm
                                product={editingProduct}
                                onSave={handleSaveProduct}
                                onCancel={handleCloseForm}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;