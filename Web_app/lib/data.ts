import type { Property, Agent } from "./types"
import { getConnection } from "./db"

// Mock data for development (when database connection fails)
const mockProperties: Property[] = [
  {
    PropertyID: 1,
    PropertyType: "Apartment",
    Location: "New York, NY",
    Size_sqm: 85,
    PriceUSD: 350000,
    ImageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
  {
    PropertyID: 2,
    PropertyType: "House",
    Location: "Los Angeles, CA",
    Size_sqm: 180,
    PriceUSD: 750000,
    ImageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
  },
  {
    PropertyID: 3,
    PropertyType: "Villa",
    Location: "Miami, FL",
    Size_sqm: 250,
    PriceUSD: 1200000,
    ImageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
  },
  {
    PropertyID: 4,
    PropertyType: "Land",
    Location: "Austin, TX",
    Size_sqm: 1000,
    PriceUSD: 500000,
    ImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2062&auto=format&fit=crop",
  },
  {
    PropertyID: 5,
    PropertyType: "Commercial",
    Location: "Chicago, IL",
    Size_sqm: 300,
    PriceUSD: 900000,
    ImageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
  },
  {
    PropertyID: 6,
    PropertyType: "Apartment",
    Location: "San Francisco, CA",
    Size_sqm: 70,
    PriceUSD: 650000,
    ImageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop",
  },
]

// Mock data for agents
const mockAgents: Agent[] = [
  {
    AgentID: 1,
    FirstName: "John",
    LastName: "Smith",
    Phone: "(123) 456-7890",
    Email: "john.smith@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    Specialization: "Residential Specialist",
    Location: "New York, NY",
    Bio: "With over 15 years of experience in the real estate industry, John specializes in luxury residential properties in the heart of New York City. His deep knowledge of the local market and strong negotiation skills have helped hundreds of clients find their dream homes.",
  },
  {
    AgentID: 2,
    FirstName: "Sarah",
    LastName: "Johnson",
    Phone: "(123) 456-7891",
    Email: "sarah.johnson@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    Specialization: "Commercial Real Estate",
    Location: "Los Angeles, CA",
    Bio: "Sarah is our top commercial real estate expert with a background in urban planning and development. She helps businesses find the perfect spaces to grow and thrive, specializing in office buildings and retail locations throughout Los Angeles.",
  },
  {
    AgentID: 3,
    FirstName: "Michael",
    LastName: "Brown",
    Phone: "(123) 456-7892",
    Email: "michael.brown@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    Specialization: "Luxury Properties",
    Location: "Miami, FL",
    Bio: "Michael specializes in high-end luxury properties and waterfront estates in Miami. His exclusive client list includes celebrities, executives, and international investors looking for premium properties and discreet, personalized service.",
  },
  {
    AgentID: 4,
    FirstName: "Jennifer",
    LastName: "Lee",
    Phone: "(123) 456-7893",
    Email: "jennifer.lee@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    Specialization: "First-Time Homebuyers",
    Location: "Chicago, IL",
    Bio: "Jennifer is passionate about helping first-time homebuyers navigate the complex process of purchasing their first property. Her patient approach and educational background make her the perfect guide for those new to real estate.",
  },
  {
    AgentID: 5,
    FirstName: "David",
    LastName: "Wilson",
    Phone: "(123) 456-7894",
    Email: "david.wilson@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    Specialization: "Investment Properties",
    Location: "Austin, TX",
    Bio: "David is our investment property expert with a background in finance and real estate development. He helps investors identify profitable opportunities and build strong real estate portfolios with a focus on long-term growth.",
  },
  {
    AgentID: 6,
    FirstName: "Emily",
    LastName: "Davis",
    Phone: "(123) 456-7895",
    Email: "emily.davis@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=2070&auto=format&fit=crop",
    Specialization: "Suburban Homes",
    Location: "San Francisco, CA",
    Bio: "Emily specializes in family homes in the suburban areas around San Francisco. With a focus on school districts, community amenities, and family-friendly neighborhoods, she helps growing families find the perfect place to call home.",
  },
  {
    AgentID: 7,
    FirstName: "Robert",
    LastName: "Miller",
    Phone: "(123) 456-7896",
    Email: "robert.miller@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
    Specialization: "Vacation Properties",
    Location: "Orlando, FL",
    Bio: "Robert is our vacation property specialist, focusing on investment opportunities in popular tourist destinations. He helps clients find profitable vacation rentals and second homes that provide both personal enjoyment and rental income.",
  },
  {
    AgentID: 8,
    FirstName: "Lisa",
    LastName: "Thompson",
    Phone: "(123) 456-7897",
    Email: "lisa.thompson@realestatepro.com",
    ImageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop",
    Specialization: "Urban Condos",
    Location: "Boston, MA",
    Bio: "Lisa specializes in urban condominiums and lofts in downtown Boston. Her knowledge of building regulations, condo associations, and urban living makes her the go-to agent for city dwellers looking for the perfect urban home.",
  },
]

// Add error handling for cloud connection timeouts
export async function getProperties(): Promise<Property[]> {
  try {
    const pool = await getConnection()
    const result = await pool.request().query("SELECT * FROM Properties")
    return result.recordset
  } catch (error) {
    console.error("Error fetching properties:", error)
    // Check if it's a connection timeout error
    if (error instanceof Error && error.message.includes("timeout")) {
      console.error("Connection timeout to cloud database. Check your network and credentials.")
    }
    // Return mock data if database connection fails
    return mockProperties
  }
}

// Update the other functions with similar error handling
export async function getPropertyById(id: number): Promise<Property | null> {
  try {
    const pool = await getConnection()
    const result = await pool.request().input("id", id).query("SELECT * FROM Properties WHERE PropertyID = @id")

    return result.recordset[0] || null
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error)
    // Check if it's a connection timeout error
    if (error instanceof Error && error.message.includes("timeout")) {
      console.error("Connection timeout to cloud database. Check your network and credentials.")
    }
    // Return mock data if database connection fails
    return mockProperties.find((p) => p.PropertyID === id) || null
  }
}

export async function getRecentProperties(limit = 3): Promise<Property[]> {
  try {
    const pool = await getConnection()
    const result = await pool
      .request()
      .input("limit", limit)
      .query("SELECT TOP (@limit) * FROM Properties ORDER BY PropertyID DESC")

    return result.recordset
  } catch (error) {
    console.error("Error fetching recent properties:", error)
    // Return mock data if database connection fails
    return mockProperties.slice(0, limit)
  }
}

// Get all agents
export async function getAgents(): Promise<Agent[]> {
  try {
    const pool = await getConnection()
    const result = await pool.request().query("SELECT * FROM Agents")
    return result.recordset
  } catch (error) {
    console.error("Error fetching agents:", error)
    // Return mock data if database connection fails
    return mockAgents
  }
}

// Get agent by ID
export async function getAgentById(id: number): Promise<Agent | null> {
  try {
    const pool = await getConnection()
    const result = await pool.request().input("id", id).query("SELECT * FROM Agents WHERE AgentID = @id")

    return result.recordset[0] || null
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error)
    // Return mock data if database connection fails
    return mockAgents.find((a) => a.AgentID === id) || null
  }
}

// Get properties by agent ID
export async function getPropertiesByAgentId(agentId: number): Promise<Property[]> {
  try {
    const pool = await getConnection()
    // In a real application, you would have a relationship between properties and agents
    // This is a simplified query that assumes there's an AgentID column in the Properties table
    const result = await pool
      .request()
      .input("agentId", agentId)
      .query("SELECT * FROM Properties WHERE AgentID = @agentId")

    return result.recordset
  } catch (error) {
    console.error(`Error fetching properties for agent with ID ${agentId}:`, error)
    // Return mock data - for demo purposes, assign some properties to each agent
    return mockProperties.filter((p) => p.PropertyID % 8 === agentId % 8)
  }
}
