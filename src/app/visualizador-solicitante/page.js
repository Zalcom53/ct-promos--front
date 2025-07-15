"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VisualizadorSolicitante() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/src/routes/producto.php") 
      .then((res) => res.json())
      .then((data) => {
        const productosTransformados = data.map((prod) => ({
          ...prod,
          fechaInicio: prod.fecha_inicio ? prod.fecha_inicio.split("T")[0] : "",
          fechaFin: prod.fecha_fin ? prod.fecha_fin.split("T")[0] : "",
        }));
        setProductos(productosTransformados);
      })
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
      alert("Solo puedes editar productos con estatus pendiente.");
      return;
    }

    if (new Date(producto.fechaFin) < new Date(producto.fechaInicio)) {
      alert("La fecha de fin no puede ser menor que la fecha de inicio.");
      return;
    }

    try {
      const body = {
        id: producto.id,
        producto: producto.producto,
        importe: Number(producto.importe),
        moneda: producto.moneda,
        fechaInicio: producto.fechaInicio,
        fechaFin: producto.fechaFin,
        estatus: producto.estatus,
        comentario: producto.comentario,
      };

      const res = await fetch("http://localhost:8080/src/routes/producto.php", { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Producto actualizado correctamente.");
      } else {
        alert("Error al actualizar producto.");
      }
    } catch (err) {
      console.error("Error en la solicitud PATCH:", err);
      alert("Error del servidor.");
    }
  };

  const irAlVisualizador = () => {
    router.push("/visualizador");
  };
  const irAlVisualizadorSolicitante = () => {
    router.push("/visualizador-solicitante");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Panel del Solicitante</h1>

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
            <th className="p-2 border">Comentario</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, index) => (
            <tr key={prod.id} className="border-t">
              <td className="p-2 border">{prod.id}</td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={prod.producto}
                  onChange={(e) => handleChange(index, "producto", e.target.value)}
                  disabled={prod.estatus !== 1 && prod.estatus !== "1"}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  step="0.01"
                  value={prod.importe}
                  onChange={(e) => handleChange(index, "importe", e.target.value)}
                  disabled={prod.estatus !== 1 && prod.estatus !== "1"}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="p-2 border">{prod.moneda === 0 || prod.moneda === "0" ? "MXN" : "USD"}</td>
              <td className="p-2 border">
                <input
                  type="date"
                  value={prod.fechaInicio}
                  onChange={(e) => handleChange(index, "fechaInicio", e.target.value)}
                  disabled={prod.estatus !== 1 && prod.estatus !== "1"}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="date"
                  value={prod.fechaFin}
                  onChange={(e) => handleChange(index, "fechaFin", e.target.value)}
                  disabled={prod.estatus !== 1 && prod.estatus !== "1"}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="p-2 border">
                {{
                  1: "Pendiente",
                  2: "Activa",
                  3: "Completada",
                  4: "Rechazada",
                }[prod.estatus]}
              </td>
              <td className="p-2 border">
                {prod.estatus === 4 || prod.estatus === "4" ? (
                  <span className="text-red-600">{prod.comentario || "(Sin comentario)"}</span>
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleUpdate(index)}
                  disabled={prod.estatus !== 1 && prod.estatus !== "1"}
                  className={`px-3 py-1 rounded text-white ${
                    prod.estatus !== 1 && prod.estatus !== "1"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
