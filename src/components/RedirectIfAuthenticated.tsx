"use client";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            toast("Ya estás logueado 😉", { icon: "✅" });
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);

    // Mientras redirige, devuelve null (no se renderiza el contenido)
    if (isAuthenticated) return null;

    return <>{children}</>;
};
