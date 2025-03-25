const API_URL = 'http://localhost:3001/api';

// Método para iniciar sesión
export const loginService = async (email: string, password: string) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

        return data;
    } catch (error) {
        throw error;
    }
};
// Método para registrar un usuario
export const registerService = async (payload: unknown) => {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const response = await res.json();
        if (!response.success) throw new Error(response.message || "Error al registrarse");
        return response;
    } catch (error) {
        throw error;
    }
};

export const requestPasswordService = async (email: string) => {
    try {
        const res = await fetch(`${API_URL}/auth/request-password-reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.message || "Error al enviar recuperación");

        return result;
    } catch (error) {
        throw error;
    }
}

export const validateResetTokenService = async (token: string) => {
    try {
        const res = await fetch(`${API_URL}/auth/verify-token/${token}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.message || "Token inválido");

        return result;
    } catch (error) {
        throw error;
    }
}

export const resetPasswordService = async (token: string, newPassword: string) => {
    try {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.message || "Error al cambiar contraseña");

        return result;
    } catch (error) {
        throw error;
    }
};