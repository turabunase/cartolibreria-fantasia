import React, { useState } from 'react';

const AdminRegistration: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validazione
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Inserisci un indirizzo email valido');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Le password non coincidono');
            return;
        }

        if (formData.password.length < 8) {
            setError('La password deve essere di almeno 8 caratteri');
            return;
        }

        try {
            // Verifica se l'admin esiste già
            const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
            const adminExists = existingAdmins.some((admin: any) => 
                admin.username === formData.username || admin.email === formData.email
            );

            if (adminExists) {
                setError('Username o email già in uso');
                return;
            }

            // Salva il nuovo admin
            const newAdmin = {
                id: Date.now().toString(),
                username: formData.username,
                email: formData.email,
                password: formData.password, // In produzione va criptata!
                createdAt: new Date().toISOString()
            };

            existingAdmins.push(newAdmin);
            localStorage.setItem('admins', JSON.stringify(existingAdmins));
            
            setSuccess(true);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError('Errore durante la registrazione');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    Registrazione Admin
                </button>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-96">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500">
                            Registrazione Admin
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {success ? (
                        <div className="text-green-600 text-center py-4">
                            Registrazione completata con successo!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Conferma Password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Registrati
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminRegistration;