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
    <main className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Registro</h2>

        <input {...register("name")} placeholder="Nombre" className="w-full p-2 mb-1 border" />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        <input {...register("last_name")} placeholder="Apellido" className="w-full p-2 mb-1 border" />
        {errors.last_name && <p className="text-red-500 text-sm mb-2">{errors.last_name.message}</p>}

        <input type="email" {...register("email")} placeholder="Correo" className="w-full p-2 mb-1 border" />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input type="password" {...register("password")} placeholder="Contraseña" className="w-full p-2 mb-1 border" />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-500 text-white p-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}
