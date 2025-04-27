/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function FloatingIAButton({ handleSuggestion }: any) {

    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleIA = async () => {
        setLoading(true);
        await handleSuggestion(prompt);
        setLoading(false);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 text-2xl flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(true)}
                title="Sugerencia con RegalinaIA"
            >
                {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6"></span> : '🤖'}
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <Dialog.Title className="text-xl font-bold mb-4">🤖 Regalina IA</Dialog.Title>
                        <input
                            className="w-full p-2 border rounded mb-4"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe tu regalo ideal..."
                        />
                        <button
                            onClick={handleIA}
                            disabled={loading}
                            className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
                        >
                            {loading ? "Generando..." : "Sugerir Regalo"}
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}