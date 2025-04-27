"use client";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export default function GiftDropZone({ children }: { children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({ id: "dropzone" });

    return (
        <motion.div
            ref={setNodeRef}
            className="relative w-64 h-64 mx-auto bg-yellow-100 border-4 border-brown-500 rounded-lg shadow-inner flex items-center justify-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
        >
            <img src="/box-open.png" alt="Caja de regalo" className="absolute inset-0 w-full h-full object-contain opacity-80" />
            <div className="z-10 text-center">
                {children}
            </div>
        </motion.div>
    );
}
