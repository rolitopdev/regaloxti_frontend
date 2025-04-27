export default function Step3ReviewConfirm({ giftData, prevStep }) {

    const handleConfirm = () => {
        // Aquí iría la lógica para enviar la orden al backend (fetch/axios)
        console.log("Datos del pedido:", giftData);
        alert("¡Pedido confirmado! 🎉");
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">✅ Revisa y Confirma tu Pedido</h2>

            <div className="mb-6">
                <h3 className="font-bold">Productos Seleccionados:</h3>
                {giftData.products.length > 0 ? (
                    <ul className="list-disc ml-5">
                        {giftData.products.map((p, idx) => (
                            <li key={idx}>{p.name} x {p.quantity}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-red-500">No has seleccionado productos.</p>
                )}
            </div>

            <div className="mb-6">
                <h3 className="font-bold">Mensaje Personalizado:</h3>
                <p className="italic text-gray-700">{giftData.message || "Sin mensaje."}</p>
            </div>

            <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">
                    Atrás
                </button>
                <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
                    Confirmar y Enviar
                </button>
            </div>
        </div>
    );
}
