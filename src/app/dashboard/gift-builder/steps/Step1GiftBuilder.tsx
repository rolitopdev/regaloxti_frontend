/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import toast from "react-hot-toast";
import GiftBox from "./components/GiftBox";
import ProductList from "./components/ProductList";  // Nuevo componente con Infinite Scroll
import { getAvailableProducts } from "@/services/productService";
import { motion } from "framer-motion";

export default function Step1GiftBuilder({ giftData, setGiftData, nextStep }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [activeProduct, setActiveProduct] = useState<any | null>(null);

    useEffect(() => {
        getAvailableProducts()
            .then((res) => res.success ? setProducts(res.data) : toast.error(res.message || "Error al cargar productos"))
            .catch((err) => toast.error(err.message || "Error al cargar productos"));
    }, []);

    const handleAddProduct = (productId: string) => {
        const product = products.find((p) => String(p.product_id) === productId);
        if (!product) return;

        const exists = giftData.products.find((item: any) => item.product_id === product.product_id);
        if (exists) {
            if (exists.quantity >= 10) {
                toast.error("Máximo 10 unidades por producto");
                return;
            }
            setGiftData({
                ...giftData,
                products: giftData.products.map((item: any) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
        } else {
            setGiftData({
                ...giftData,
                products: [...giftData.products, { ...product, quantity: 1 }]
            });
        }
        toast.success(`${product.name} añadido a la caja`);
    };

    const onDragStart = (event: any) => {
        const item = products.find((p) => String(p.product_id) === event.active.id);
        if (item) setActiveProduct(item);
    };

    const onDragEnd = (event: any) => {
        if (!event.over || event.over.id !== "dropzone") {
            setActiveProduct(null);
            return;
        }
        handleAddProduct(event.active.id);
        setActiveProduct(null);
    };

    const increaseQuantity = (productId: number) => {
        setGiftData({
            ...giftData,
            products: giftData.products.map((item: any) =>
                item.product_id === productId
                    ? { ...item, quantity: Math.min(10, item.quantity + 1) }
                    : item
            )
        });
    };

    const decreaseQuantity = (productId: number) => {
        setGiftData({
            ...giftData,
            products: giftData.products.map((item: any) =>
                item.product_id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        });
    };

    const removeProduct = (productId: number) => {
        setGiftData({
            ...giftData,
            products: giftData.products.filter((item: any) => item.product_id !== productId)
        });
    };

    const totalPrice = giftData.products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    return (
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="flex flex-col lg:flex-row items-start justify-center gap-10 p-6">
                <GiftBox
                    productsInBox={giftData.products}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeProduct}
                    totalPrice={totalPrice}
                />
                <ProductList products={products} />
            </div>

            {/* Drag Overlay para el efecto visual */}
            <DragOverlay>
                {activeProduct && (
                    <motion.div
                        className="p-4 bg-white border-2 border-yellow-400 rounded shadow-lg text-center w-32"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                    >
                        <p className="font-bold text-sm">{activeProduct.name}</p>
                        <p className="text-green-600 text-xs">${activeProduct.price}</p>
                    </motion.div>
                )}
            </DragOverlay>

            {/* Botón para avanzar */}
            <div className="text-center mt-8">
                <button
                    onClick={nextStep}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50"
                    disabled={giftData.products.length === 0}
                >
                    Siguiente: Personalizar Mensaje
                </button>
            </div>
        </DndContext>
    );
}