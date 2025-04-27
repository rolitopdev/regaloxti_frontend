/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export default function GiftBox({ productsInBox, onIncrease, onDecrease, onRemove, totalPrice }: any) {
    const { setNodeRef, isOver } = useDroppable({ id: "dropzone" });

    const totalProducts = productsInBox.reduce((acc: number, item: any) => acc + item.quantity, 0);

    return (
        <div className="flex flex-col items-center w-full">
            <div
                ref={setNodeRef}
                className={`relative w-full h-72 border-4 rounded-lg transition-all duration-300 
                    ${isOver ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-100'} 
                    shadow-inner flex items-center justify-center`}
            >
                {totalProducts === 0 ? (
                    <p className="text-gray-500 text-center px-4">Arrastra productos aquí 🎁</p>
                ) : (
                    <motion.div
                        className="w-full h-full flex flex-wrap p-2 overflow-auto"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                    >
                        {productsInBox.map((item: any) => (
                            <div key={item.product_id} className="bg-white border rounded p-2 m-1 w-28 text-center shadow">
                                <p className="text-xs font-semibold truncate">{item.name}</p>
                                <p className="text-green-600 text-sm">${item.price}</p>
                                <div className="flex justify-center items-center space-x-1 mt-1">
                                    <button onClick={() => onDecrease(item.product_id)} className="px-2 bg-gray-300 rounded text-xs">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onIncrease(item.product_id)} className="px-2 bg-gray-300 rounded text-xs">+</button>
                                </div>
                                <button onClick={() => onRemove(item.product_id)} className="mt-1 bg-red-500 text-white px-2 py-1 rounded text-xs">🗑️</button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            <p className="mt-4 font-bold">{totalProducts} producto(s)</p>
            <p className="text-xl font-bold text-green-700 mt-2">
                Total: ${totalPrice.toFixed(2)}
            </p>
        </div>
    );
}