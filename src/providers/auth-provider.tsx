"use client"
import { getAccessToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "@/lib/cookies";
import type { Admin } from "@/schemas";
import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "@/queries/auth";

interface AuthContextType {
    admin: Admin | null;
    loading: boolean;
    login: (adminData: Admin, accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentAdmin = async () => {
            try {
                const { data } = await getMe();
                setAdmin(data.admin);
            } catch {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentAdmin();
    }, [getAccessToken()]);

    const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
    };

    const login = (admin: Admin, accessToken: string, refreshToken: string) => {
        setAdmin(admin);
        setTokens({ accessToken, refreshToken });
    };

    const logout = () => {
        setAdmin(null);
        removeAccessToken();
        removeRefreshToken();
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}