/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { validateResetTokenService, resetPasswordService } from "../../../../services/authService";

// Validación Yup
const schema = yup.object().shape({
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña obligatoria"),
});

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const [tokenValido, setTokenValido] = useState<boolean | null>(null); // null = cargando

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // Validar token al montar el componente
  useEffect(() => {
    const validarToken = async () => {
      try {
        await validateResetTokenService(token as string);
        setTokenValido(true);
      } catch (error: any) {
        toast.error(error.message || "Token inválido");
        setTokenValido(false);
      }
    };
    validarToken();
  }, [token]);

  const onSubmit = async (data: any) => {
    try {
      const response = await resetPasswordService(token as string, data.password);
      toast.success(response.message || "Contraseña actualizada");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Error al cambiar contraseña");
    }
  };

  // 🔄 Loading
  if (tokenValido === null) {
    return <p className="text-center mt-20">Verificando token...</p>;
  }

  // ❌ Token inválido
  if (tokenValido === false) {
    return (
      <main className="flex h-screen items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">Token inválido o expirado</h2>
          <p className="mb-4">Solicita una nueva recuperación de contraseña.</p>
          <button
            onClick={() => router.push("/recovery-password")}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Ir a Recuperar Contraseña
          </button>
        </div>
      </main>
    );
  }

  // ✅ Token válido, mostrar formulario
  return (
    <main className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Contraseña</h2>

        <input
          type="password"
          placeholder="Ingresa tu nueva contraseña"
          {...register("password")}
          className="w-full p-2 mb-1 border"
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white p-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
        >
          {isSubmitting ? "Guardando..." : "Cambiar Contraseña"}
        </button>
      </form>
    </main>
  );
}
