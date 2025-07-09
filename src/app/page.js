"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    producto: "",
    importe: "",
    moneda: 0,
    fechaInicio: "",
    fechaFin: "",
    estatus: "1", // Por defecto pendiente
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { producto, importe, fechaInicio, fechaFin, estatus } = formData;

    if (!producto.trim()) {
      alert("El campo Producto es obligatorio.");
      return false;
    }

    if (importe === "" || isNaN(importe) || Number(importe) <= 0) {
      alert("El Importe debe ser un número positivo.");
      return false;
    }

    if (!fechaInicio) {
      alert("La Fecha de inicio es obligatoria.");
      return false;
    }

    if (!fechaFin) {
      alert("La Fecha de fin es obligatoria.");
      return false;
    }

    if (new Date(fechaFin) < new Date(fechaInicio)) {
      alert("La Fecha de fin no puede ser menor que la Fecha de inicio.");
      return false;
    }

    const estatusNum = Number(estatus);
    if (
      estatus === "" ||
      isNaN(estatusNum) ||
      estatusNum < 1 ||
      estatusNum > 4
    ) {
      alert("Estatus debe ser un número entre 1 y 4.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // No continuar si no pasa validación
    }

    try {
      const res = await fetch("/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          importe: Number(formData.importe),
          estatus: Number(formData.estatus),
        }),
      });

      if (res.ok) {
        await res.json();
        alert("Datos guardados correctamente");
        setFormData({
          producto: "",
          importe: "",
          moneda: 0,
          fechaInicio: "",
          fechaFin: "",
          estatus: "1",
          comentario: "",
        });
      } else {
        alert("Error al guardar los datos");
      }
    } catch (err) {
      console.error("Error de red:", err);
      alert("Error al conectar con el servidor");
    }
  };

  const irAlVisualizador = () => {
    router.push("/visualizador");
  };
  const irAlVisualizadorSolicitante = () => {
    router.push("/visualizador-solicitante");
  }

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
              step="0.01"
              min="0"
              className="border rounded px-2 py-1 mt-1"
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
              min={1}
              max={4}
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
              rows={3}
              className="border rounded px-2 py-1 mt-1"
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Enviar
          </button>

          <button
            type="button"
            onClick={irAlVisualizador}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Ir al visualizador de promociones
          </button>

          <button
            type="button"
            onClick={irAlVisualizadorSolicitante}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Seguimiento promociones
          </button>
        </form>
      </main>
    </div>
  );
}
