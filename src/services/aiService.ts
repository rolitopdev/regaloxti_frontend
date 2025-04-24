export const suggestGiftService = async (prompt: string) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/suggest-gift`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` },
            body: JSON.stringify({ prompt }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error en sugerencia");
        return data;

    } catch (error) {
        throw error;
    }
};
