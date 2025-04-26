/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #ff69b4, #ffdab4)" }}>
        <header className="flex items-center justify-between px-8 py-6 relative mt-2">
          {/* Logo centrado */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-[#142d71]">
            <img src="https://i.imgur.com/llHWoWb.png" className="w-[120px] bg-no-repeat" alt="" />
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex space-x-6 text-[#142d71] font-medium ml-auto">
            <Link href="/login" className="hover:underline">Iniciar Sesión</Link>
            <Link href="/register" className="hover:underline">Registrarme</Link>
          </nav>

          {/* Botón Hamburguesa */}
          <button
            className="md:hidden text-3xl text-[#142d71] ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Menú Mobile */}
          {menuOpen && (
            <div className="absolute top-full right-8 bg-white shadow-lg rounded mt-2 py-4 px-6 flex flex-col space-y-4 text-[#142d71] z-50">
              <Link href="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>Registrarme</Link>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#142d71] mb-4 text-center">
              Crea tus regalos personalizados <br />
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              Envia regalos únicos y personalizados a tus seres queridos. <br />
              Sin preocupaciones, sin estrés.
            </p>
            <div className="flex items-center justify-center">
              <button className="bg-[#142d71] text-white px-6 py-3 rounded hover:brightness-110 transition">
                ¡Programa Ahora!
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img src="https://i.imgur.com/LO42zS3.png" alt="Gift Box" className="max-w-xs md:max-w-md" />
          </div>
        </section>
      </div>

      {/* How it works */}
      <section className="bg-white py-16 px-8 text-center">
        <h2 className="text-2xl font-bold text-[#142d71] mb-10">Heres how it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-semibold text-[#142d71] mb-2">Pick out your box</h3>
            <p className="text-gray-600">Order for yourself or send it to your friends or family.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="font-semibold text-[#142d71] mb-2">Lovingly made</h3>
            <p className="text-gray-600">Your order gets wrapped with care from our team.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-semibold text-[#142d71] mb-2">Packed and shipped out</h3>
            <p className="text-gray-600">Within 1-3 days, your box is on its way!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        © 2025 RegaloXTi. All rights reserved.
      </footer>
    </div>
  );
}
