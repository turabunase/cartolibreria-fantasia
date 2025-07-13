
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Scuola from './pages/Scuola';
import Oggettistica from './pages/Oggettistica';
import Creazioni from './pages/Creazioni';
import AdminDashboard from './pages/AdminDashboard';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import ProductManagement from './pages/ProductManagement';
import { ProductProvider } from './utils/productContext';

const App: React.FC = () => {
    return (
        <ProductProvider>
            <HashRouter>
                <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-300 via-yellow-200 to-yellow-300 text-gray-800 font-sans">
                <Header />
                <div className="flex-grow relative">
                    <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10 pointer-events-none"></div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/scuola" element={<Scuola />} />
                        <Route path="/oggettistica" element={<Oggettistica />} />
                        <Route path="/creazioni" element={<Creazioni />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                        <Route path="/admin/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
                    </Routes>
                </div>
                <footer className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-8 relative overflow-hidden">
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <p className="text-xl font-bold">&copy; {new Date().getFullYear()} Cartolibreria Fantasia. Tutti i diritti riservati.</p>
                        <p className="text-white/90 mt-2">Via della Fantasia, 123 - 00100 Roma | P.IVA 1234567890</p>
                    </div>
                    <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] opacity-10"></div>
                </footer>
                </div>
            </HashRouter>
        </ProductProvider>
    );
};

export default App;
