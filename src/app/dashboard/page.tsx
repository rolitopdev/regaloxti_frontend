"use client";
import { useAuth } from "../../hooks/useAuth";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Dashboard() {

    const { user, logout } = useAuth();
    const { isChecking } = useAuthGuard();

    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Verificando acceso...</p>
            </div>
        );
    }

    return (
        <main className="flex h-screen items-center justify-center flex-col">
            <h1 className="text-3xl font-bold mb-2">¡Hola {user?.name}!</h1>
            <p className="mb-4 text-gray-600">Bienvenido al dashboard privado 👾</p>

            <div className="bg-gray-100 p-4 rounded shadow w-[300px] text-sm text-left mb-6">
                <p><strong>Nombre:</strong> {user?.name} {user?.last_name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Identificación:</strong> {user?.identification_type} {user?.identification}</p>
                <p><strong>Teléfono:</strong> {user?.phone_number}</p>
            </div>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Cerrar Sesión
            </button>
        </main>
    );

}