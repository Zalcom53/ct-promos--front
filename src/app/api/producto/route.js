import pool from "@/db/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM producto ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      producto,
      importe,
      moneda,
      fechaInicio,
      fechaFin,
      estatus = 1, 
      comentario,
    } = data;

    const query = `
      INSERT INTO producto (producto, importe, moneda, fecha_inicio, fecha_fin, estatus, comentario)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      producto,
      importe,
      moneda,
      fechaInicio,
      fechaFin,
      estatus,
      comentario,
    ];

    const result = await pool.query(query, values);

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al insertar producto:", error);
    return new Response(JSON.stringify({ error: "Error al insertar producto" }), {
      status: 500,
    });
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();

    const query = `
      UPDATE producto
      SET producto = $1,
          importe = $2,
          moneda = $3,
          fecha_inicio = $4,
          fecha_fin = $5,
          estatus = $6,
          comentario = $7
      WHERE id = $8
      RETURNING *;
    `;

    const values = [
      data.producto,
      data.importe,
      data.moneda,
      data.fechaInicio,
      data.fechaFin,
      data.estatus,
      data.comentario,
      data.id,
    ];

    const result = await pool.query(query, values);

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), {
      status: 500,
    });
  }
}
