
'use client'


import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import giftAnimation from '../../public/assets/gift.json';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen text-white px-6 py-12 overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          REGALO<span className="text-red-500">X</span>TI 🎁
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Arma regalos únicos y personalizados para sorprender a quienes más quieres.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-red-500 text-white px-10 py-4 mt-8 rounded-full text-xl shadow-xl hover:bg-red-600 transition"
        >
          🎉 Empezar ahora
        </motion.button>
      </motion.div>

      {/* Gift Animation - Centered and Bigger */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1.15, rotate: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-[400px] mx-auto mt-20"
      >
        <Lottie animationData={giftAnimation} loop={true} />
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
        className="mt-24 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-800 rounded-2xl shadow-lg hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-2">1. Elige un regalo</h3>
            <p className="text-gray-400">Explora nuestra colección y selecciona el regalo ideal.</p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-2xl shadow-lg hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-2">2. Personalízalo</h3>
            <p className="text-gray-400">Agrega mensajes, nombres y detalles únicos.</p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-2xl shadow-lg hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-2">3. Envíalo</h3>
            <p className="text-gray-400">Envía tu regalo directo al corazón de esa persona especial.</p>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-32 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-10">Lo que dicen nuestros usuarios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <p className="text-gray-300 italic">“¡RegaloXti salvó mi aniversario! El detalle fue tan especial que casi lloro yo también.”</p>
            <p className="mt-4 text-red-400 font-semibold">— Camila R.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <p className="text-gray-300 italic">“Súper fácil de usar y el regalo llegó justo a tiempo. Me encantó la experiencia.”</p>
            <p className="mt-4 text-red-400 font-semibold">— Andrés M.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <p className="text-gray-300 italic">“¡Un detalle que hizo la diferencia! Personalizarlo fue muy divertido.”</p>
            <p className="mt-4 text-red-400 font-semibold">— Laura G.</p>
          </div>
        </div>
      </motion.div>

      {/* Social Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex justify-center space-x-6 mt-24 text-gray-400"
      >
        <a href="#" className="hover:text-white"><FaFacebookF size={24} /></a>
        <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
        <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
      </motion.div>
    </div>
  );
}
