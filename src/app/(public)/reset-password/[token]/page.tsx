/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { validateResetTokenService, resetPasswordService } from "../../../../services/authService";

const schema = yup.object().shape({
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña obligatoria"),
});

export default function ResetPassword() {

  const { token } = useParams();
  const router = useRouter();
  const [validToken, setValidToken] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const validateToken = async () => {
      try {
        await validateResetTokenService(token as string);
        setValidToken(true);
      } catch {
        setValidToken(false);
      }
    };
    validateToken();
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

  if (validToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
        <div className="flex items-center justify-center h-screen">
          <p className="text-[#142d71] text-lg">Verificando token...</p>
        </div>
      </div>
    );
  }

  if (validToken === false) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Token inválido o expirado</h2>
          <p className="mb-6 text-gray-600">Solicita una nueva recuperación de contraseña.</p>
          <button
            onClick={() => router.push("/recovery-password")}
            className="w-full py-2 rounded-md text-white transition hover:brightness-110"
            style={{ background: "linear-gradient(to bottom, #142d71, #314e9e)" }}
          >
            Ir a Recuperar Contraseña
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #f472b6, #f9a8d4, #ffdab4)" }}>
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-4 text-[#142d71] text-center">Nueva Contraseña</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Ingresa tu nueva contraseña para completar el proceso de recuperación.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 bg-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white transition 
                       ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
            style={{ background: "linear-gradient(to bottom, #142d71, #314e9e)" }}
          >
            {isSubmitting ? "Guardando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}