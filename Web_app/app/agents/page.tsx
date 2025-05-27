import Image from "next/image"
import Link from "next/link"
import { Building, Mail, MapPin, Phone, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAgents } from "@/lib/data"

export default async function AgentsPage() {
  const agents = await getAgents()

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
            <Link href="/agents" className="font-medium font-bold text-blue-600">
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold">Our Real Estate Agents</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Meet our team of experienced real estate professionals dedicated to helping you find your perfect
              property.
            </p>
            <div className="mx-auto flex max-w-md flex-col items-center rounded-lg bg-white p-4 shadow-md sm:flex-row sm:gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-9" placeholder="Search agents by name or location..." />
              </div>
              <Button className="mt-2 w-full sm:mt-0 sm:w-auto">Search</Button>
            </div>
          </div>
        </section>

        {/* Featured Agents */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Featured Agents</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {agents.slice(0, 3).map((agent) => (
                <Card key={agent.AgentID} className="overflow-hidden">
                  <div className="relative h-64 w-full bg-blue-50">
                    <Image
                      src={agent.ImageUrl || "/placeholder.svg?height=300&width=300&text=Agent"}
                      alt={`${agent.FirstName} ${agent.LastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        {agent.FirstName} {agent.LastName}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="mb-4 text-gray-600">
                      {agent.Bio || "Experienced real estate agent specializing in residential properties."}
                    </p>
                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{agent.Location || "New York, NY"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{agent.Phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{agent.Email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/agents/${agent.AgentID}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Link href={`/contact?agent=${agent.AgentID}`} className="w-full">
                        <Button className="w-full">Contact</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Agents */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">All Agents</h2>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" className="rounded-full">
                All
              </Button>
              <Button variant="outline" className="rounded-full">
                Residential
              </Button>
              <Button variant="outline" className="rounded-full">
                Commercial
              </Button>
              <Button variant="outline" className="rounded-full">
                Luxury
              </Button>
              <Button variant="outline" className="rounded-full">
                Investment
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {agents.map((agent) => (
                <Card key={agent.AgentID}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex flex-col items-center">
                      <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-full">
                        <Image
                          src={agent.ImageUrl || "/placeholder.svg?height=200&width=200&text=Agent"}
                          alt={`${agent.FirstName} ${agent.LastName}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-center text-lg font-bold">
                        {agent.FirstName} {agent.LastName}
                      </h3>
                      <p className="text-center text-sm text-gray-500">
                        {agent.Specialization || "Residential Specialist"}
                      </p>
                      <div className="mt-1 flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div className="mb-4 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{agent.Phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{agent.Email}</span>
                      </div>
                    </div>
                    <Link href={`/agents/${agent.AgentID}`}>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            {agents.length > 8 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-50">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-lg bg-blue-50 p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-bold">Join Our Team of Professionals</h2>
                  <p className="mb-6 text-lg text-gray-600">
                    Are you a passionate real estate agent looking to grow your career? We're always looking for
                    talented individuals to join our team.
                  </p>
                  <ul className="mb-8 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <span>Competitive commission structure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <span>Ongoing professional development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <span>Marketing and administrative support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <span>Access to exclusive property listings</span>
                    </li>
                  </ul>
                  <Link href="/careers">
                    <Button size="lg">Apply Now</Button>
                  </Link>
                </div>
                <div className="relative hidden h-64 overflow-hidden rounded-lg md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                    alt="Real estate team meeting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
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
