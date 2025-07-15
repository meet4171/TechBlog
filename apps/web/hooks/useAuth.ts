import { AuthContext } from "@/app/contexts/AuthContext";
import { AuthContextType } from "@/types/auth";
import { useContext } from "react";


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};