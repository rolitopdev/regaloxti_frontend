/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/orderService";
import toast from "react-hot-toast";
import { useSession } from "@/context/AuthContext";
import { formatCOP } from "@/utils/formatCurrency";

export default function Step3ReviewConfirm({ giftData, prevStep }: any) {

    const user = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const totalPrice = giftData.products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    const handleConfirm = async () => {
        if (!giftData.products || giftData.products.length === 0) {
            toast.error('Debes seleccionar al menos un producto.');
            return;
        }

        if (!giftData.recipient || !giftData.recipient.name || !giftData.recipient.phone || !giftData.recipient.address || !giftData.recipient.date) {
            toast.error('Debes completar todos los datos del destinatario.');
            return;
        }

        setLoading(true);

        const result = await createOrder(giftData, user.user_id);

        setLoading(false);

        if (result.success) {
            toast.success('🎉 ¡Pedido enviado exitosamente!');
            router.push("/dashboard");
        } else {
            toast.error(`Error: ${result.message}`);
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">✅ Revisa y Confirma tu Pedido</h2>

            <div className="mb-6">
                <h3 className="font-bold mb-2">🛒 Productos:</h3>
                {giftData.products.map((p: any, idx: number) => (
                    <p key={idx}>{p.name} x {p.quantity} <span className="text-sm text-gray-500">({formatCOP(p.price)} c/u)</span></p>
                ))}
            </div>
            <div className="mb-6">
                <h3 className="font-bold mb-2">📍 Destinatario:</h3>
                <p><strong>Nombre:</strong> {giftData.recipient.name}</p>
                <p><strong>Teléfono:</strong> {giftData.recipient.phone}</p>
                <p><strong>Fecha de Envío:</strong> {giftData.recipient.date}</p>
                <p><strong>Dirección:</strong> {giftData.recipient.address}</p>
            </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2">💌 Mensaje:</h3>
                <p className="italic">{giftData.message}</p>
            </div>

            <div className="text-right mb-6">
                <h3 className="text-xl font-semibold">💲 Total: {formatCOP(totalPrice)}</h3>
            </div>

            <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">
                    Atrás
                </button>
                <button onClick={handleConfirm} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
                    {loading ? 'Guardando...' : 'Confirmar y Enviar'}
                </button>
            </div>
        </div>
    );
}
