/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { requestPasswordService } from "../../../services/authService";

// Validación
const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
});

export default function RecoveryPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await requestPasswordService(data.email);
            console.log('res', res);
            toast.success(res.message || "Correo de recuperación enviado");
        } catch (error: any) {
            toast.error(error.message || "Algo salió mal");
        }
    };

    return (
        <main className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email")}
                    className="w-full p-2 mb-1 border"
                />
                {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-yellow-500 text-white p-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
                >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </main>
    );
}
