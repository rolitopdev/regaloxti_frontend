/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: any) {

    const [search, setSearch] = useState("");
    const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
    const [loadCount, setLoadCount] = useState(10);
    const loaderRef = useRef<HTMLDivElement>(null);

    // ✅ Memorizar el filtrado para evitar renders innecesarios
    const filtered = useMemo(() => {
        return products.filter((p: any) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    // 🎯 Actualizar productos visibles cuando cambia el filtro o el contador
    useEffect(() => {
        setVisibleProducts(filtered.slice(0, loadCount));
    }, [filtered, loadCount]);

    // 🚀 IntersectionObserver montado una sola vez
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setLoadCount(prev => {
                    if (prev >= filtered.length) return prev;
                    return prev + 10;
                });
            }
        });

        const currentLoader = loaderRef.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [filtered.length]);  // Solo al montar

    return (
        <div className="w-full max-w-5xl mx-auto">
            <input
                className="w-full p-2 border rounded mb-4"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setLoadCount(10);  // Reiniciar al buscar
                }}
                placeholder="🔍 Buscar productos..."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visibleProducts.map((product: any) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>

            <div ref={loaderRef} className="py-6 text-center text-gray-400">
                {filtered.length === 0
                    ? "No se encontraron productos"
                    : visibleProducts.length < filtered.length
                        ? "Cargando más productos..."
                        : ""}
            </div>
        </div>
    );
}
