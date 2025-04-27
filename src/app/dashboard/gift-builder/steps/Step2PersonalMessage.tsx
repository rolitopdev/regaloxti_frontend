/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

export default function Step2PersonalMessage({ giftData, setGiftData, nextStep, prevStep }: any) {
    const [message, setMessage] = useState(giftData.message || '');

    const handleNext = () => {
        setGiftData({ ...giftData, message });
        nextStep();
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">💌 Personaliza tu Mensaje</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu dedicatoria aquí..."
                className="w-full h-32 p-3 border rounded mb-6"
            />

            <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">
                    Atrás
                </button>
                <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                    Siguiente: Confirmar Pedido
                </button>
            </div>
        </div>
    );
}
