import { NextResponse } from "next/server"
import { getProperties, getPropertyById } from "@/lib/data"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (id) {
      const property = await getPropertyById(Number.parseInt(id))

      if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 })
      }

      return NextResponse.json(property)
    }

    const properties = await getProperties()
    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
