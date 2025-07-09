"use client";

import { useEffect, useState } from "react";

export default function Visualizador() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/api/producto")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const handleChange = (index, field, value) => {
    const nuevos = [...productos];
    nuevos[index][field] = value;
    setProductos(nuevos);
  };

  const handleUpdate = async (index) => {
    const producto = productos[index];

    if (producto.estatus !== 1 && producto.estatus !== "1") {
      alert("Solo se pueden modificar productos con estatus pendiente.");
      return;
    }

    const nuevoEstatus = Number(producto.nuevoEstatus);
    if (![2, 3, 4].includes(nuevoEstatus)) {
      alert("Selecciona un estatus válido (2, 3 o 4).");
      return;
    }

    if (nuevoEstatus === 4 && (!producto.comentario || producto.comentario.trim() === "")) {
      alert("Debe proporcionar un comentario si el producto es rechazado.");
      return;
    }

    try {
      const res = await fetch("/api/producto", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: producto.id,
          producto: producto.producto,
          importe: producto.importe,
          moneda: producto.moneda,
          fechaInicio: producto.fecha_inicio,
          fechaFin: producto.fecha_fin,
          estatus: nuevoEstatus,
          comentario: producto.comentario,
        }),
      });

      if (res.ok) {
        alert("Actualizado correctamente");
        const actualizados = [...productos];
        actualizados[index].estatus = nuevoEstatus;
        setProductos(actualizados);
      } else {
        alert("Error al actualizar el producto.");
      }
    } catch (err) {
      console.error("Error al hacer PATCH:", err);
      alert("Error en el servidor.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Visualizador de Promociones</h1>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Importe</th>
            <th className="p-2 border">Moneda</th>
            <th className="p-2 border">Inicio</th>
            <th className="p-2 border">Fin</th>
            <th className="p-2 border">Estatus</th>
            <th className="p-2 border">Nuevo Estatus</th>
            <th className="p-2 border">Comentario</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, index) => (
            <tr key={prod.id} className="border-t">
              <td className="p-2 border">{prod.id}</td>
              <td className="p-2 border">{prod.producto}</td>
              <td className="p-2 border">{prod.importe}</td>
              <td className="p-2 border">{prod.moneda === 0 ? "MXN" : "USD"}</td>
              <td className="p-2 border">{prod.fecha_inicio.split("T")[0]}</td>
              <td className="p-2 border">{prod.fecha_fin.split("T")[0]}</td>
              <td className="p-2 border">
                {{ 1: "Pendiente", 2: "Activa", 3: "Completada", 4: "Rechazada" }[prod.estatus]}
              </td>
              <td className="p-2 border">
                {prod.estatus === 1 ? (
                  <select
                    value={prod.nuevoEstatus || ""}
                    onChange={(e) => handleChange(index, "nuevoEstatus", e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Seleccionar</option>
                    <option value="2">Activa</option>
                    <option value="3">Completada</option>
                    <option value="4">Rechazada</option>
                  </select>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-2 border">
                <textarea
                  value={prod.comentario || ""}
                  onChange={(e) => handleChange(index, "comentario", e.target.value)}
                  disabled={prod.estatus !== 1}
                  className="border rounded px-2 py-1 w-full"
                  rows={2}
                />
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleUpdate(index)}
                  disabled={prod.estatus !== 1}
                  className={`px-3 py-1 rounded text-white ${
                    prod.estatus !== 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Actualizar
                </button>
              </td>
            </tr> 
            
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
