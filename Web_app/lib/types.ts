export interface Property {
  PropertyID: number
  PropertyType: string
  Location: string
  Size_sqm: number
  PriceUSD: number
  ImageUrl?: string
  AgentID?: number
}

export interface Client {
  ClientID: number
  FirstName: string
  LastName: string
  Phone: string
  Email: string
}

export interface Agent {
  AgentID: number
  FirstName: string
  LastName: string
  Phone: string
  Email: string
  ImageUrl?: string
  Specialization?: string
  Location?: string
  Bio?: string
}

export interface Sale {
  SaleID: number
  PropertyID: number
  ClientID: number
  AgentID: number
  SaleDate: string
  SalePrice: number
}

export interface Visit {
  VisitID: number
  PropertyID: number
  ClientID: number
  AgentID: number
  VisitDate: string
}
