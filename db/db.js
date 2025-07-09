// db/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',      // ← tu usuario de PostgreSQL
  host: 'localhost',
  database: 'productos_db',
  password: 'contraseña', // ← tu contraseña
  port: 5432,               // Puerto por defecto
});

export default pool;
