"use server"

import { revalidatePath } from "next/cache"
import { getConnection } from "./db"

interface PropertyFormData {
  propertyType: string
  location: string
  size: number
  price: number
  description: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export async function createProperty(data: PropertyFormData) {
  try {
    const pool = await getConnection()

    // First, create or find the client
    const clientResult = await pool
      .request()
      .input("firstName", data.firstName)
      .input("lastName", data.lastName)
      .input("email", data.email)
      .input("phone", data.phone)
      .query(`
        DECLARE @ClientID INT
        
        SELECT @ClientID = ClientID FROM Clients 
        WHERE Email = @email
        
        IF @ClientID IS NULL
        BEGIN
          INSERT INTO Clients (FirstName, LastName, Email, Phone)
          VALUES (@firstName, @lastName, @email, @phone)
          
          SET @ClientID = SCOPE_IDENTITY()
        END
        
        SELECT @ClientID AS ClientID
      `)

    const clientId = clientResult.recordset[0].ClientID

    // Then, create the property
    const propertyResult = await pool
      .request()
      .input("propertyType", data.propertyType)
      .input("location", data.location)
      .input("size", data.size)
      .input("price", data.price)
      .query(`
        INSERT INTO Properties (PropertyType, Location, Size_sqm, PriceUSD)
        VALUES (@propertyType, @location, @size, @price)
        
        SELECT SCOPE_IDENTITY() AS PropertyID
      `)

    const propertyId = propertyResult.recordset[0].PropertyID

    // Revalidate the properties page to show the new property
    revalidatePath("/properties")

    return { success: true, propertyId }
  } catch (error) {
    console.error("Error creating property:", error)
    throw new Error("Failed to create property")
  }
}

export async function scheduleVisit(propertyId: number, clientId: number, date: string) {
  try {
    const pool = await getConnection()

    // Assign a random agent for the visit
    const agentResult = await pool.request().query("SELECT TOP 1 AgentID FROM Agents ORDER BY NEWID()")

    if (agentResult.recordset.length === 0) {
      throw new Error("No agents available")
    }

    const agentId = agentResult.recordset[0].AgentID

    // Create the visit
    await pool
      .request()
      .input("propertyId", propertyId)
      .input("clientId", clientId)
      .input("agentId", agentId)
      .input("visitDate", date)
      .query(`
        INSERT INTO Visits (PropertyID, ClientID, AgentID, VisitDate)
        VALUES (@propertyId, @clientId, @agentId, @visitDate)
      `)

    return { success: true }
  } catch (error) {
    console.error("Error scheduling visit:", error)
    throw new Error("Failed to schedule visit")
  }
}
