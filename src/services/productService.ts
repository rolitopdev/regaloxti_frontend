/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAvailableProducts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` }
        });

        const data = await res.json();
        return data;

    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message || 'Error desconocido.' };
    }
};
