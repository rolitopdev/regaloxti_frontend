/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { getAllOrders, deleteOrder } from "@/services/orderService";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.locale("es");

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const hasFetched = useRef(false);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            if (res.success) {
                setOrders(res.data);
                setFilteredOrders(res.data);
            }
        } catch (err) {
            console.log('err', err);
            toast.error("Error al cargar pedidos", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchOrders();
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter((order: any) =>
                    order.user?.name.toLowerCase().includes(search.toLowerCase()) ||
                    order.recipient_name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, orders]);

    const handleDelete = async (orderId: number) => {
        const confirm = window.confirm("¿Estás seguro de eliminar esta solicitud?");
        if (!confirm) return;
        deleteOrder(orderId);
        toast.success("Solicitud eliminada", { position: "top-center" });
        setOrders((prevOrders) => prevOrders.filter((order: any) => order.order_id !== orderId));
    };

    const columns = [
        { name: "#", selector: (row: any) => row.order_id, sortable: true, width: "70px" },
        { name: "Cliente", selector: (row: any) => `${row.User?.name} ${row.User.last_name}` || "-", sortable: true },
        { name: "Destinatario", selector: (row: any) => row.recipient_name, sortable: true },
        { name: "Fecha Envío", selector: (row: any) => `${dayjs(row.delivery_date).format("D [de] MMMM YYYY h:mm A")}`, sortable: true },
        {
            name: "Productos",
            cell: (row: any) => (
                <ul className="list-decimal ml-4 text-xs">
                    {row.Products?.map((p: any) => (
                        <li key={p.product_id}>{p.name} x {p.OrderProduct.quantity}</li>
                    ))}
                </ul>
            ),
            grow: 2
        },
        {
            name: "Acciones",
            cell: (row: any) => (
                <div className="space-x-2">
                    <button
                        onClick={() => handleDelete(row.order_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-lg hover:bg-red-600 cursor-pointer"
                    >
                        <MdDelete />
                    </button>
                    {/* <button
                        onClick={() => toast("Editar en construcción")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-lg hover:bg-yellow-600 cursor-pointer"
                    >
                        <MdEdit />
                    </button> */}
                </div>
            )
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📋 Gestión de Solicitudes</h1>

            <input
                type="text"
                placeholder="🔎 Buscar por cliente o destinatario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full md:w-1/3 p-2 border border-gray-300 rounded"
            />

            <DataTable
                columns={columns}
                data={filteredOrders}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                responsive
                noDataComponent={<p className="text-center text-gray-500 py-4">No se encontraron registros.</p>}
            />
        </div>
    );
}
