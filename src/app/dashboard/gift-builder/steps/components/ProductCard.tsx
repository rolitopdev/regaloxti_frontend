/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

export default function ProductCard({ product }: any) {
    const { setNodeRef, listeners, attributes } = useDraggable({ id: String(product.product_id) });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-3 border rounded shadow text-center cursor-pointer bg-white"
        >
            <Image src={product.image_url} alt={product.name} height={86} width={96} className="rounded object-cover" />
            <h4 className="text-sm font-semibold truncate">{product.name}</h4>
            <p className="text-xs text-gray-500">${product.price}</p>
        </div>
    );
}
