"use client";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
            toast("Ya estás logueado 😉", { icon: "✅" });
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) return null;

    return <>{children}</>;
}
