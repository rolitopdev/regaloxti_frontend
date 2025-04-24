/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { getAvailableProducts } from "../services/productService";
import { suggestGiftService } from "../services/aiService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function GiftBuilderLite() {
  
  const [products, setProducts] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [activeProduct, setActiveProduct] = useState<any | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAvailableProducts()
      .then((res) => {
        console.log('res', res)
        if (res.success) {
          setProducts(res.data)
        } else {
          if (res.message?.toString().toLowerCase() === 'token inválido o expirado'){
            localStorage.clear();
            router.push("/");
          }
          else toast.error(res.message || "Error al cargar productos")
        }
      })
      .catch((err) => {
        console.log('err', err)
        toast.error(err.message || "Error al cargar productos")
      });
  }, [router]);

  const onDragStart = (event: any) => {
    const item = products.find((p) => String(p.product_id) === event.active.id);
    if (item) setActiveProduct(item);
  };

  const onDragEnd = (event: any) => {
    if (!event.over || event.over.id !== "dropzone") {
      setActiveProduct(null);
      return;
    }

    const product = products.find((p) => String(p.product_id) === event.active.id);
    if (!product) return;

    const exists = selectedItems.find((item) => item.product_id === product.product_id);
    if (exists) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    setActiveProduct(null);
  };

  const removeItem = (productId: number | string) => {
    setSelectedItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const handleSuggestion = async () => {
    try {
      setLoading(true);
      const suggestions = await suggestGiftService(prompt);
      console.log('suggestions', suggestions)
      const enriched = suggestions.data.map((s: any) => ({ ...s, quantity: s.quantity || 1 }));
      toast.success(`RegalinaIA: ${suggestions.message}`, { duration: 10000, icon: "🤖" });
      setSelectedItems(enriched);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showGiftInConsole = () => {
    console.log("🎁 Productos en la caja:", selectedItems);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Catálogo */}
        <div>
          <h2 className="text-xl font-bold mb-4">Productos disponibles</h2>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                id={String(product.product_id)}
                name={product.name}
              />
            ))}
          </div>

          {/* IA */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">🤖 Sugerencia con IA</h3>
            <input
              className="w-full p-2 border rounded mb-2"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: algo relajante, romántico, etc."
            />
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleSuggestion}
              disabled={loading}
            >
              {loading ? "Pensando..." : "Sugerir regalo"}
            </button>
          </div>

          {/* Mostrar caja */}
          <button
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
            onClick={showGiftInConsole}
          >
            Ver caja en consola 🧾
          </button>
        </div>

        {/* Caja */}
        <div>
          <h2 className="text-xl font-bold mb-4">Mi caja de regalo 🎁</h2>
          <GiftDropZone>
            {selectedItems.length === 0 ? (
              <p className="text-gray-400">Arrastra productos aquí</p>
            ) : (
              <ul className="space-y-2">
                {selectedItems.map((item) => (
                  <li
                    key={item.product_id}
                    className="flex justify-between items-center p-2 border rounded bg-white shadow"
                  >
                    <span>{item.name} x{item.quantity} </span>
                    <span className="text-gray-500 text-sm">{item.description}</span>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </GiftDropZone>
        </div>
      </div>

      <DragOverlay>
        {activeProduct ? (
          <div className="p-4 bg-yellow-100 border rounded shadow text-black text-center">
            {activeProduct.name} 
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function ProductCard({ id, name }: { id: string; name: string }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 border rounded shadow text-center cursor-pointer transition ${isDragging ? "opacity-50 scale-105" : ""
        }`}
    >
      {name}
    </div>
  );
}

function GiftDropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: "dropzone" });
  return (
    <div
      ref={setNodeRef}
      className="min-h-[200px] p-4 border-2 border-dashed rounded bg-gray-100"
    >
      {children}
    </div>
  );
}
