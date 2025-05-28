import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, MapPin, Ruler } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import type { Property } from "@/lib/types"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={
            property.ImageUrl ||
            (property.PropertyType === "Apartment"
              ? "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
              : property.PropertyType === "House"
                ? "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop"
                : property.PropertyType === "Villa"
                  ? "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop"
                  : property.PropertyType === "Land"
                    ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2062&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop")
          }
          alt={`${property.PropertyType} in ${property.Location}`}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
          For Sale
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{property.Location}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">{property.PropertyType}</h3>
        <p className="mb-4 text-2xl font-bold text-green-600">${property.PriceUSD.toLocaleString()}</p>
        <div className="mb-4 flex items-center justify-between border-b border-t py-2">
          <div className="flex items-center">
            <Bed className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-sm">3 Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-sm">2 Baths</span>
          </div>
          <div className="flex items-center">
            <Ruler className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-sm">{property.Size_sqm} m²</span>
          </div>
        </div>
        <Link href={`/properties/${property.PropertyID}`}>
          <button className="w-full rounded bg-blue-600 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700">
            View Details
          </button>
        </Link>
      </CardContent>
    </Card>
  )
}
