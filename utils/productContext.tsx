import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
    featured: boolean;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductsByCategory: (category: string) => Product[];
    getFeaturedProducts: () => Product[];
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Qui andrà la logica per caricare i prodotti dal backend
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    useEffect(() => {
        // Salva i prodotti nel localStorage quando vengono modificati
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = {
            ...product,
            id: Date.now().toString()
        };
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === id ? { ...product, ...updatedProduct } : product
            )
        );
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const getProductsByCategory = (category: string) => {
        return products.filter(product => product.category === category);
    };

    const getFeaturedProducts = () => {
        return products.filter(product => product.featured);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductsByCategory,
                getFeaturedProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};