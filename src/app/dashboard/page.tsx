/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { getOrdersByUserId } from "@/services/orderService";
import { useSession } from "@/context/AuthContext";
import Image from "next/image";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.locale("es");

export default function DashboardPage() {

    const { user } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    const fetchOrders = async () => {
        try {
            const res = await getOrdersByUserId(user.user_id);
            if (res.success) setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error al cargar pedidos:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchOrders();
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-[#142d71] mb-6 text-center">📦 Tus Solicitudes</h2>

            {loading ? (
                <p className="text-gray-500 text-center">Cargando pedidos...</p>
            ) : (
                <>
                    <div className="bg-blue-100 text-blue-800 p-4 rounded shadow mb-6 text-center text-lg">
                        Tienes <strong>{orders.length}</strong> solicitud(es) registradas 🧾
                    </div>

                    {orders.length === 0 ? (
                        <p className="text-gray-600 text-center">No tienes solicitudes aún. ¡Empieza creando tu primer regalo! 🎁</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order: any) => (
                                <div
                                    key={order.order_id}
                                    className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-lg text-blue-700">Pedido #{order.order_id}</h3>
                                        <span className="text-sm text-gray-500">
                                            📅 {dayjs(order.delivery_date).format("D [de] MMMM YYYY h:mm A")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1">👤 Destinatario: <strong>{order.recipient_name}</strong></p>
                                    <p className="text-sm text-gray-700 mb-3">📍 Dirección: {order.recipient_address}</p>
                                    <div className="border-t pt-2 mt-2">
                                        <h4 className="text-sm font-medium mb-2">🎁 Productos:</h4>
                                        <ul className="flex flex-col gap-2">
                                            {order.Products?.map((prod: any) => (
                                                <li key={prod.product_id} className="flex items-center gap-3">
                                                    <Image
                                                        src={prod.image_url} alt={prod.name}
                                                        width={50}
                                                        height={50}
                                                        className="bg-no-repeat object-cover rounded"
                                                    />
                                                    <span className="text-sm">{prod.name} x {prod.OrderProduct.quantity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
