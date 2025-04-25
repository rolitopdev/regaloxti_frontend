/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { registerService } from "../../../services/authService";
import toast from "react-hot-toast";

// 🎯 Esquema Yup para el registro
const schema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  last_name: yup.string().required("Apellido es obligatorio"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export default function Register() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (form: any) => {
    try {
      const res = await registerService(form);
      const userData = res.data;
      login(userData, userData.token);
      toast.success(res.message || "Registro exitoso");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-white m-3.5 p-8 md:rounded-3xl shadow-lg">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-2 text-[#142d71]">Crear Cuenta</h2>
          <p className="text-sm text-[#142d71] mb-6">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-[#142d71] hover:underline">Inicia sesión</a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-[#142d71] mb-1">Nombre</label>
              <input
                {...register("name")}
                placeholder="Tu nombre"
                className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#142d71] mb-1">Apellido</label>
              <input
                {...register("last_name")}
                placeholder="Tu apellido"
                className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
              />
              {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#142d71] mb-1">Correo</label>
              <input
                type="email"
                {...register("email")}
                placeholder="ejemplo@correo.com"
                className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#142d71] mb-1">Contraseña</label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 rounded-md transition bg-[#142d71]
                          ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-6">
            Protected by reCAPTCHA and subject to the <a href="#" className="text-[#142d71] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#142d71] hover:underline">Terms of Service</a>.
          </p>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center text-white p-10">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#142d71]">
          Únete a nuestra comunidad y empieza a crear momentos únicos.
        </h1>
        <p className="text-center max-w-xs text-[#142d71]">
          Con RegaloXTi, gestionar y enviar regalos nunca fue tan fácil y especial.
        </p>
      </div>
    </div>
  );
}
