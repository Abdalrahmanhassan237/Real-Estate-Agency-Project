import { NextResponse } from "next/server"
import { getConnection, closeConnection } from "@/lib/db"

export async function GET() {
  try {
    // Try to get a connection to the database
    const pool = await getConnection()

    // If we get here, the connection was successful
    // Let's try a simple query to make sure everything is working
    const result = await pool.request().query("SELECT @@VERSION as version")

    // Close the connection
    await closeConnection()

    // Return success response with the SQL Server version
    return NextResponse.json({
      status: "connected",
      message: "Successfully connected to the database using Windows Authentication",
      dbServer: process.env.DB_SERVER,
      dbName: process.env.DB_NAME,
      sqlVersion: result.recordset[0].version,
    })
  } catch (error) {
    console.error("Database connection test failed:", error)

    // Return error response
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to the database",
        dbServer: process.env.DB_SERVER,
        dbName: process.env.DB_NAME,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
