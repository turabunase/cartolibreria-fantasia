import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured: boolean;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id' | 'image'> & { image: File | null }) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (id: string) => void;
    getProductsByCategory: (category: string) => Product[];
    getFeaturedProducts: () => Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>; // Aggiungi setProducts
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
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.BASE_URL + 'products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Could not fetch products: ", error);
                // Fallback to localStorage if fetching fails or no products.json
                const savedProducts = localStorage.getItem('products');
                if (savedProducts) {
                    setProducts(JSON.parse(savedProducts));
                } else {
                    // Initialize with empty array if no products.json and no localStorage data
                    setProducts([]);
                }
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Save products to localStorage whenever they change
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Omit<Product, 'id' | 'image'> & { image: File | null }) => {
        const newProduct: Product = {
            id: Date.now().toString(),
            ...product,
            image: product.image ? URL.createObjectURL(product.image) : product.image === null ? '' : product.image.toString() // Gestisci il caso in cui l'immagine sia null
        };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
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
                setProducts, // Aggiungi setProducts al contesto
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