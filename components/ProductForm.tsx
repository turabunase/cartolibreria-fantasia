import React, { useState } from 'react';

interface ProductFormProps {
    onSubmit?: (product: {
        name: string;
        description: string;
        price: string;
        image: File | null;
        category: string;
        featured: boolean;
    }) => void;
    onSave?: (product: {
        name: string;
        description: string;
        price: number;
        category: string;
        featured: boolean;
        image?: string;
    }) => void;
    onCancel?: () => void;
    product?: {
        id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        featured: boolean;
        image: string;
    } | null;
    initialValues?: {
        name: string;
        description: string;
        price: string;
        category: string;
        featured: boolean;
    };
    isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
    onSubmit, 
    onSave, 
    onCancel, 
    product, 
    initialValues, 
    isEditing = false 
}) => {
    const [name, setName] = useState(product?.name || initialValues?.name || '');
    const [description, setDescription] = useState(product?.description || initialValues?.description || '');
    const [price, setPrice] = useState(product ? product.price.toString() : initialValues?.price || '');
    const [image, setImage] = useState<File | null>(null);
    const [category, setCategory] = useState(product?.category || initialValues?.category || 'scuola');
    const [featured, setFeatured] = useState(product?.featured || initialValues?.featured || false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (onSave) {
            // Per la gestione prodotti (modifica/creazione)
            const productData = {
                name,
                description,
                price: parseFloat(price),
                category,
                featured,
                ...(image && { image: URL.createObjectURL(image) })
            };
            onSave(productData);
        } else if (onSubmit) {
            // Per la dashboard admin (compatibilità con versione esistente)
            onSubmit({
                name,
                description,
                price,
                image,
                category,
                featured
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6">
                {isEditing ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
            </h2>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome Prodotto</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Descrizione</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent h-32"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Prezzo</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                    pattern="[0-9]+(\.[0-9]{1,2})?"
                    title="Inserisci un prezzo valido (es. 10.99)"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Immagine</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    accept="image/*"
                    required={!isEditing}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Categoria</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                >
                    <option value="scuola">Scuola</option>
                    <option value="cancelleria">Cancelleria</option>
                    <option value="belle_arti">Belle Arti</option>
                    <option value="oggettistica">Oggettistica</option>
                    <option value="creazioni">Creazioni</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-gray-700 font-semibold">
                    Mostra in Home Page
                </label>
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300"
                >
                    {product ? 'Salva Modifiche' : isEditing ? 'Salva Modifiche' : 'Aggiungi Prodotto'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                    >
                        Annulla
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;