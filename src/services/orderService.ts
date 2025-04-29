/* eslint-disable @typescript-eslint/no-explicit-any */

export const createOrder = async (orderData: any, user_id: number) => {
    try {
        orderData.user_id = user_id;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` },
            body: JSON.stringify(orderData),
        });

        const data = await res.json();
        return data;

    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message || 'Error desconocido.' };
    }
};

export const getOrdersByUserId = async (user_id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user_id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` },
        });

        const data = await res.json();
        return data;

    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message || 'Error desconocido.' };
    }
};

