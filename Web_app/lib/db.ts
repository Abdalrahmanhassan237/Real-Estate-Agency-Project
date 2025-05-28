import sql from "mssql"

const config: sql.config = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: true, // لازم مع Azure
    trustServerCertificate: false,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}

let pool: sql.ConnectionPool | null = null

export async function getConnection() {
  try {
    if (!pool) {
      console.log(`Connecting to Azure SQL Server at ${process.env.DB_SERVER}`)
      pool = await sql.connect(config)
      console.log("✅ Connected to Azure SQL Database")
    }
    return pool
  } catch (err) {
    console.error("❌ Azure SQL Server connection error:", err)
    throw new Error("Failed to connect to Azure SQL Database")
  }
}

export async function closeConnection() {
  try {
    if (pool) {
      await pool.close()
      pool = null
      console.log("SQL Server connection closed")
    }
  } catch (err) {
    console.error("Error closing SQL Server connection:", err)
  }
}
