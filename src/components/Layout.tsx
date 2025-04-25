"use client";
import { useState } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed md:static z-50 top-0 left-0 h-full bg-white shadow-lg transition-transform 
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#142d71] mb-8">RegaloXTi 🎁</h2>
                    <nav className="flex flex-col space-y-4 text-gray-700">
                        <Link href="/dashboard" className="hover:text-[#142d71]">🏠 Inicio</Link>
                        <Link href="/dashboard/gift-builder" className="hover:text-[#142d71]">🎁 Armar Regalo</Link>
                        { /*cerrar sesions */}

                    </nav>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button
                            className="md:hidden text-[#142d71] text-2xl"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>
                        <h1 className="text-xl font-semibold text-[#142d71] hidden md:block">Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Aquí puedes meter tus íconos */}
                        {/* <button className="bg-gray-100 p-2 rounded-full">🔔</button>
                        <button className="bg-gray-100 p-2 rounded-full">💬</button> */}
                        {/* <img src="https://" alt="Perfil" className="w-10 h-10 rounded-full border" /> */}
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}
