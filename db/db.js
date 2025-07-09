// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',               // ← tu usuario de PostgreSQL
  host: 'localhost',             // ← o IP si es remoto
  database: 'productos_db',      // ← tu base de datos
  password: 'tu_contraseña',     // ← tu contraseña real
  port: 5432,
});

export default pool;
