import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) return setError('*Email y contraseña son obligatorios');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err?.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <label className="block mb-2">Email</label>
                <input className="w-full p-2 border rounded mb-4" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label className="block mb-2">Contraseña</label>
                <input type="password" className="w-full p-2 border rounded mb-4"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} className="w-full p-2 bg-principal hover:brightness-90 transition-all text-white rounded">
                    {loading ? 'Ingresando…' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}