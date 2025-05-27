import { NextResponse } from "next/server"
import { scheduleVisit } from "@/lib/actions"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { propertyId, clientId, date } = body

    if (!propertyId || !clientId || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await scheduleVisit(propertyId, clientId, date)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error scheduling visit:", error)
    return NextResponse.json({ error: "Failed to schedule visit" }, { status: 500 })
  }
}
