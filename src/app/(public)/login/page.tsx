/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { loginService } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from 'react-toastify';
import Link from "next/link";

const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

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
            toast.success(res.message, { position: "top-center" });
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.message, { position: "top-center" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row"
            style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
            {/* Left Side - Form */}
            <div className="flex flex-1 items-center justify-center bg-white m-3.5 p-8 md:rounded-3xl shadow-lg">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl font-bold mb-2 text-[#142d71]">Iniciar Sesión</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Usuario nuevo?{' '}
                        <a href="#" className="text-[#142d71] hover:underline">Crea una cuenta</a>
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm text-[#142d71] mb-1">Correo</label>
                            <input
                                type="email"
                                placeholder="eureka22@gmail.com"
                                {...register("email")}
                                className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-[#142d71] mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 pr-10 bg-transparent"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="text-right">
                            <Link href="/recovery-password" className="text-sm text-[#142d71] hover:underline">Olvidaste la contraseña?</Link>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-b bg-[#142d71] text-white py-2 rounded-md transition 
                                        ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isSubmitting ? "Entrando..." : "Login"}
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-6">
                        Protected by reCAPTCHA and subject to the <a href="#" className="text-[#142d71] hover:underline">RegaloXTi Privacy Policy</a> and <a href="#" className="text-pink-500 hover:underline">Terms of Service</a>.
                    </p>
                </div>
            </div>

            {/* Right Side - Info */}
            <div className="hidden md:flex flex-1 flex-col items-center justify-center text-white p-10">
                <h1 className="text-3xl font-bold text-center mb-4 text-[#142d71]">
                    Inicia sesión y descubre un mundo de sorpresas
                </h1>
                <p className="text-center max-w-xs text-[#142d71]">
                    Con RegaloXTi, gestionar y enviar regalos nunca fue tan fácil y especial.
                </p>
            </div>
        </div>
    );
}
