const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

// quick connection check (logs once on startup)
async function checkDb() {
  const [rows] = await pool.query("SELECT 1 AS ok");
  console.log("MySQL connected:", rows[0]);
}

module.exports = { pool, checkDb };
