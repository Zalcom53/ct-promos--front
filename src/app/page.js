"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    producto: "",
    importe: "",
    moneda: 0,
    fechaInicio: "",
    fechaFin: "",
    estatus: "",
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes hacer un POST a tu backend
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label className="flex flex-col text-sm">
            Producto
            <input
              type="text"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              maxLength={50}
              required
              className="border rounded px-2 py-1 mt-1"
            />
          </label>

          <label className="flex flex-col text-sm">
            Importe
            <input
              type="number"
              name="importe"
              value={formData.importe}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 mt-1"
              step="0.01"
            />
          </label>

          <label className="flex flex-col text-sm">
            Moneda
            <select
              name="moneda"
              value={formData.moneda}
              onChange={handleChange}
              className="border rounded px-2 py-1 mt-1"
            >
              <option value={0}>MXN</option>
              <option value={1}>USD</option>
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Fecha de inicio
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 mt-1"
            />
          </label>

          <label className="flex flex-col text-sm">
            Fecha de fin
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 mt-1"
            />
          </label>

          <label className="flex flex-col text-sm">
            Estatus
            <input
              type="number"
              name="estatus"
              value={formData.estatus}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 mt-1"
            />
          </label>

          <label className="flex flex-col text-sm">
            Comentario
            <textarea
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
              maxLength={255}
              className="border rounded px-2 py-1 mt-1"
              rows={3}
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {}
      </footer>
    </div>
  );
}
