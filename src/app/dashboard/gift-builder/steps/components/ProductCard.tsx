/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDraggable } from "@dnd-kit/core";

export default function ProductCard({ product }: any) {
    const { setNodeRef, listeners, attributes } = useDraggable({ id: String(product.product_id) });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-3 border rounded shadow text-center cursor-pointer bg-white"
        >
            <img src={product.image_url} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
            <h4 className="text-sm font-semibold truncate">{product.name}</h4>
            <p className="text-xs text-gray-500">${product.price}</p>
        </div>
    );
}
