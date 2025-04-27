"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiHome, FiGift, FiUser, FiLogOut, FiBell, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {

    const { logout } = useAuth();
    const pathname = usePathname();

    const [isMounted, setIsMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => setIsMounted(true), []);
    if (!isMounted) return null;

    const menuItems = [
        { href: "/dashboard", icon: <FiHome />, key: "Inicio" },
        { href: "/dashboard/gift-builder", icon: <FiGift />, key: "Armar Regalo" },
        // { href: "/dashboard/profile", icon: <FiUser />, key: "Perfil" }
    ];

    return (
        <div className="flex h-screen bg-[#f9fafb] text-gray-700">
            {/* Sidebar - Visible en md+, Drawer en móvil */}
            <aside className={`fixed md:static z-40 top-0 left-0 h-full w-48 bg-white 
                              transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300`}>
                <div className="flex flex-col py-6 px-4 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl text-[#6366f1]">
                            <Image src="https://i.imgur.com/llHWoWb.png" alt="Logo RegaloXTi" width={140} height={140} className="bg-no-repeat" />
                        </div>
                        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                            <FiX />
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
                                    ${pathname === item.href
                                        ? "bg-[#eef2ff] text-[#6366f1]"
                                        : "text-gray-500 hover:bg-gray-100"}
                                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span>{item.icon}</span>
                                <span>{item.key}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => { logout(); setSidebarOpen(false); }}
                            className="flex items-center space-x-3 p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            <FiLogOut />
                            <span>Cerrar Sesión</span>
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center bg-white px-6 py-3">
                    <div className="flex items-center space-x-4">
                        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                            <FiMenu />
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FiBell />
                        <FiUser className="w-9 h-9 rounded-full border" />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
