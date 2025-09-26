"use client"
import type { Admin } from "@/schemas";
import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { getMe, logout as signout } from "@/queries/auth";

interface AuthContextType {
    admin: Admin | null;
    loading: boolean;
    login: (adminData: Admin) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        (async () => {
            try {
                const res = await getMe();
                setAdmin(res?.data?.admin || null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = useCallback((admin: Admin) => {
        setAdmin(admin);
    }, []);

    const logout = useCallback(async () => {
        await signout();
        setAdmin(null);
    }, []);

    const value = useMemo(() => ({ admin, loading, login, logout }), [admin, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}