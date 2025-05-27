import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Building, Calendar, MapPin, Ruler, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getPropertyById } from "@/lib/data"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(Number.parseInt(params.id))

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <p className="mt-2 text-gray-600">The property you are looking for does not exist.</p>
        <Link href="/properties" className="mt-4">
          <Button>Back to Properties</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Building className="h-6 w-6" />
            <span>RealEstate Pro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/properties" className="font-medium font-bold text-blue-600">
              Properties
            </Link>
            <Link href="/agents" className="font-medium">
              Agents
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/properties" className="text-gray-500 hover:text-gray-700">
              Properties
            </Link>
            <span className="text-gray-500">/</span>
            <span className="font-medium">{property.PropertyType}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
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
                <div className="absolute bottom-4 left-4 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white">
                  For Sale
                </div>
              </div>

              <div className="mb-6 grid grid-cols-4 gap-2">
                {[
                  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop",
                ].map((src, i) => (
                  <div key={i} className="relative h-20 cursor-pointer overflow-hidden rounded-lg md:h-24">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Property image ${i + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-2xl font-bold md:text-3xl">{property.PropertyType}</h1>
                  <p className="text-2xl font-bold text-green-600">${property.PriceUSD.toLocaleString()}</p>
                </div>

                <div className="mb-4 flex items-center text-gray-600">
                  <MapPin className="mr-1 h-5 w-5" />
                  <span>{property.Location}</span>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex flex-col items-center justify-center">
                    <Bed className="mb-1 h-6 w-6 text-blue-600" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Bath className="mb-1 h-6 w-6 text-blue-600" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Ruler className="mb-1 h-6 w-6 text-blue-600" />
                    <span className="text-sm text-gray-500">Area</span>
                    <span className="font-medium">{property.Size_sqm} m²</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Description</h2>
                <p className="text-gray-600">
                  This beautiful {property.PropertyType.toLowerCase()} is located in {property.Location} and offers a
                  spacious living area of {property.Size_sqm} square meters. The property features 3 bedrooms, 2
                  bathrooms, a modern kitchen, and a comfortable living room with plenty of natural light.
                </p>
                <p className="mt-4 text-gray-600">
                  The neighborhood is quiet and family-friendly, with easy access to schools, parks, shopping centers,
                  and public transportation. This is an excellent opportunity for families looking for a comfortable
                  home or investors seeking a profitable property.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Heating System</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Parking Space</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Garden</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Security System</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>High-Speed Internet</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold">Location</h2>
                <div className="h-[300px] w-full overflow-hidden rounded-lg bg-gray-200">
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="mr-2 h-6 w-6 text-gray-400" />
                    <span className="text-gray-500">Map view of {property.Location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        alt="Agent John Smith"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">John Smith</h3>
                      <p className="text-sm text-gray-500">Property Agent</p>
                    </div>
                  </div>

                  <div className="mb-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <span>+1 (123) 456-7890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>Available for viewing</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Agent</h3>
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                    <Input placeholder="Your Phone" type="tel" />
                    <Textarea placeholder="Your Message" className="h-24" />
                    <Button className="w-full">Send Message</Button>
                    <Button variant="outline" className="w-full">
                      Schedule Viewing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">RealEstate Pro</h3>
              <p className="text-gray-400">Your trusted partner in finding and selling properties.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-white">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/agents" className="hover:text-white">
                    Agents
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Real Estate St.</li>
                <li>Property City, PC 12345</li>
                <li>info@realestatepro.com</li>
                <li>+1 (123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
              <p className="mb-2 text-gray-400">Subscribe to our newsletter for updates</p>
              <div className="flex">
                <Input className="rounded-r-none" placeholder="Your email" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RealEstate Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
