import React, { createContext, useContext, useEffect, useState } from 'react';
interface AuthContextValue {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children }) => {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem('token'));
    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);
    const login = async (email: string, password: string) => {
        // Validación mínima (en frontend)
        if (!email || !password) throw new Error('Email and password required');
        // Simula llamada a API de auth
        await new Promise((r) => setTimeout(r, 400));
        // Token falso
        const fakeToken = btoa(`${email}:fake-token`);
        setToken(fakeToken);
        return;
    };
    const logout = () => setToken(null);
    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider >;
};
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}