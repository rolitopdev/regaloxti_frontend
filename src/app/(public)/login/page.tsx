/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { loginService } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

// 🎯 1. Esquema de validación con Yup
const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    // 🎯 2. React Hook Form con Yup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        try {
            const res = await loginService(data.email, data.password);
            const userData = res.data;
            login(userData, userData.token);
            toast.success(res.message || "Login exitoso");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Error al iniciar sesión");
        }
    };

    return (
        <main className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

                <input
                    type="email"
                    placeholder="Correo"
                    {...register("email")}
                    className="w-full p-2 mb-1 border"
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password")}
                    className="w-full p-2 mb-1 border"
                />
                {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-500 text-white p-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </main>
    );
}
