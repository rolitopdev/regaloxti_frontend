/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { requestPasswordService } from "../../../services/authService";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
});

export default function RecoveryPassword() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        try {
            const res = await requestPasswordService(data.email);
            if (res.success) {
                router.push("/login");
                toast.success(res.message, { position: "top-center" });
            }
        } catch (error: any) {
            toast.error(error.message || "Algo salió mal", { position: "top-center" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
            <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-4 text-[#142d71] text-center">Recuperar Contraseña</h2>
                <p className="text-gray-600 text-sm mb-6 text-center">
                    Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            {...register("email")}
                            className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-md text-white transition 
                                   ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
                        style={{ background: "linear-gradient(to bottom, #142d71, #314e9e)" }}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar enlace"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    ¿Recordaste tu contraseña?{" "}
                    <a href="/login" className="text-pink-500 hover:underline">Inicia sesión</a>
                </p>
            </div>
        </div>
    );
}