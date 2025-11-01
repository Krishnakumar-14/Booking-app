import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { PlaneIcon } from '../components/IconComponents';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
        login({ name: 'Krishna', email });
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative max-w-md w-full bg-blue-50 p-8 rounded-xl shadow-lg"
                >
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center space-x-2 text-3xl font-bold text-blue-600">
                            <PlaneIcon className="w-10 h-10 transform -rotate-45" />
                            <span>FlightEase</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-600">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                            Log In
                        </button>
                    </form>
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;