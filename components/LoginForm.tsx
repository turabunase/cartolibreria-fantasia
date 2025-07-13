import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Verifica credenziali negli admin registrati
            const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
            const validAdmin = existingAdmins.find((admin: any) => 
                (admin.username === username || admin.email === username) && 
                admin.password === password
            );

            if (validAdmin) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentAdmin', JSON.stringify(validAdmin));
                navigate('/admin/dashboard', { replace: true });
            } else {
                // Fallback per l'admin di default
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('currentAdmin', JSON.stringify({
                        id: 'default',
                        username: 'admin',
                        email: 'admin@cartoleria.com'
                    }));
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    setError('Credenziali non valide');
                }
            }
        } catch (err) {
            setError('Errore durante il login');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-6">Accesso Amministratore</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300"
                >
                    Accedi
                </button>
            </form>
        </div>
    );
};

export default LoginForm;