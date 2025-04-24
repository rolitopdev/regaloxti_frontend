// ✅ Header mejorado con menú responsive tipo hamburguesa sin errores de hidratación
"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shouldShowHeader, setShouldShowHeader] = useState(false);

  useEffect(() => {
    const isPrivateRoute = !(
      pathname.includes("/login") ||
      pathname.includes("/register") ||
      pathname.includes("/recovery-password")
    );
    setShouldShowHeader(isPrivateRoute);
  }, [pathname]);

  if (!shouldShowHeader) return null;

  return (
    <header className="bg-[#002454] text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">RegaloXti</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm md:text-base">
          <Link href="/dashboard" className="hover:underline">Inicio</Link>
          <Link href="/dashboard/gift-builder" className="hover:underline">Armar Regalo</Link>
          <button onClick={logout} className="hover:underline">Cerrar sesión</button>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden mt-4 px-4 flex flex-col gap-4">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:underline">Inicio</Link>
          <Link href="/dashboard/gift-builder" onClick={() => setOpen(false)} className="hover:underline">Armar Regalo</Link>
          <button onClick={() => { logout(); setOpen(false); }} className="text-left hover:underline">Cerrar sesión</button>
        </nav>
      )}
    </header>
  );
}