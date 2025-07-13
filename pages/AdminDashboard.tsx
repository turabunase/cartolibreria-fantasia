import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../utils/productContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
    featured: boolean;
}

const AdminDashboard: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const handleAddProduct = async (productData: any) => {
        const imageUrl = URL.createObjectURL(productData.image);
        const newProduct = {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            imageUrl,
            category: productData.category,
            featured: productData.featured
        };
        addProduct(newProduct);
        setIsAddingProduct(false);
    };

    const handleEditProduct = async (productData: any) => {
        if (!editingProduct) return;
        
        const updatedProduct = {
            ...productData,
            imageUrl: productData.image 
                ? URL.createObjectURL(productData.image) 
                : editingProduct.imageUrl
        };
        
        updateProduct(editingProduct.id, updatedProduct);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (productId: string) => {
        if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
            deleteProduct(productId);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500">
                    Pannello Amministrazione
                </h1>
                <div className="flex space-x-4">
                    <Link
                        to="/admin/products"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Gestione Prodotti
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {isAddingProduct ? (
                <ProductForm onSubmit={handleAddProduct} />
            ) : editingProduct ? (
                <ProductForm
                    onSubmit={handleEditProduct}
                    initialValues={editingProduct}
                    isEditing
                />
            ) : (
                <div>
                    <button
                        onClick={() => setIsAddingProduct(true)}
                        className="mb-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300"
                    >
                        Aggiungi Nuovo Prodotto
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow-lg p-6">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-lg font-bold text-pink-600 mb-4">€ {product.price}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Elimina
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;