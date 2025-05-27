import Link from "next/link"
import { Building, Home, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PropertyCard } from "@/components/property-card"
import { getProperties } from "@/lib/data"

export default async function HomePage() {
  const properties = await getProperties()

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
            <Link href="/properties" className="font-medium">
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
      <main className="flex-1">
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Find Your Dream Property</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Browse our extensive collection of properties for sale and find your perfect match.
            </p>
            <div className="mx-auto flex max-w-3xl flex-col items-center rounded-lg bg-white p-4 shadow-md md:flex-row md:gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-9" placeholder="Search location..." />
              </div>
              <div className="mt-2 w-full md:mt-0 md:w-1/3">
                <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="mt-2 w-full md:mt-0 md:w-1/3">
                <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Price Range</option>
                  <option value="0-100000">$0 - $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000+">$500,000+</option>
                </select>
              </div>
              <Button className="mt-2 w-full md:mt-0 md:w-auto">Search</Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Featured Properties</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.length > 0 ? (
                properties.map((property) => <PropertyCard key={property.PropertyID} property={property} />)
              ) : (
                <div className="col-span-3 text-center py-10">
                  <Home className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No properties found</h3>
                  <p className="mt-2 text-gray-500">Be the first to list a property!</p>
                </div>
              )}
            </div>
            <div className="mt-10 text-center">
              <Link href="/properties">
                <Button size="lg">View All Properties</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Why Choose Us</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Wide Range of Properties</h3>
                  <p className="text-gray-600">
                    Browse through our extensive collection of properties across various locations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Expert Agents</h3>
                  <p className="text-gray-600">
                    Our professional agents are ready to help you find or sell your property.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Home className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Easy Property Listing</h3>
                  <p className="text-gray-600">
                    List your property for sale with just a few clicks and reach potential buyers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Sell Your Property?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              List your property with us and connect with potential buyers quickly and easily.
            </p>
            <Link href="/sell-property">
              <Button size="lg">List Your Property</Button>
            </Link>
          </div>
        </section>
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
            <p className="mt-2 text-xs">Images courtesy of Unsplash</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
