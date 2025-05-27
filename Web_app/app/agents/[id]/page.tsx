import Image from "next/image"
import Link from "next/link"
import { Building, Calendar, CheckCircle, Home, Mail, MapPin, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAgentById, getPropertiesByAgentId } from "@/lib/data"
import { PropertyCard } from "@/components/property-card"

interface AgentPageProps {
  params: {
    id: string
  }
}

export default async function AgentPage({ params }: AgentPageProps) {
  const agent = await getAgentById(Number.parseInt(params.id))
  const properties = await getPropertiesByAgentId(Number.parseInt(params.id))

  if (!agent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Agent not found</h1>
        <p className="mt-2 text-gray-600">The agent you are looking for does not exist.</p>
        <Link href="/agents" className="mt-4">
          <Button>Back to Agents</Button>
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
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/agents" className="text-gray-500 hover:text-gray-700">
              Agents
            </Link>
            <span className="text-gray-500">/</span>
            <span className="font-medium">
              {agent.FirstName} {agent.LastName}
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
                <div className="relative h-64 w-full bg-blue-50">
                  <Image
                    src={agent.ImageUrl || "/placeholder.svg?height=400&width=800&text=Agent"}
                    alt={`${agent.FirstName} ${agent.LastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">
                        {agent.FirstName} {agent.LastName}
                      </h1>
                      <p className="text-lg text-blue-600">{agent.Specialization || "Residential Specialist"}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">(42 Reviews)</span>
                    </div>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span>{agent.Phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span>{agent.Email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{agent.Location || "New York, NY"}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-3 text-xl font-bold">About Me</h2>
                    <p className="text-gray-600">
                      {agent.Bio ||
                        `With over 10 years of experience in the real estate industry, I specialize in helping clients find their dream homes and investment properties. My deep knowledge of the local market allows me to provide valuable insights and guidance throughout the buying or selling process.
                        
                        I believe in building long-term relationships with my clients based on trust, integrity, and exceptional service. Whether you're a first-time homebuyer or an experienced investor, I'm committed to making your real estate journey smooth and successful.`}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-3 text-xl font-bold">Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Residential</span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Luxury Homes</span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                        First-Time Buyers
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Investment</span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Relocation</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-3 text-xl font-bold">Credentials</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Licensed Real Estate Agent</h3>
                          <p className="text-sm text-gray-600">Since 2013</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Certified Residential Specialist</h3>
                          <p className="text-sm text-gray-600">CRS Designation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Accredited Buyer's Representative</h3>
                          <p className="text-sm text-gray-600">ABR Designation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Top Producer</h3>
                          <p className="text-sm text-gray-600">2020, 2021, 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold">My Listings</h2>
                {properties.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {properties.map((property) => (
                      <PropertyCard key={property.PropertyID} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-50 p-8 text-center">
                    <Home className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">No active listings</h3>
                    <p className="mt-2 text-gray-500">This agent currently has no active property listings.</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-bold">Client Reviews</h2>
                <div className="space-y-6">
                  {[
                    {
                      name: "Emily Davis",
                      date: "October 15, 2023",
                      rating: 5,
                      comment:
                        "Working with this agent was an absolute pleasure! They were incredibly knowledgeable about the local market and helped me find my dream home within my budget. Their negotiation skills saved me thousands of dollars.",
                      image:
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
                    },
                    {
                      name: "Michael Johnson",
                      date: "September 3, 2023",
                      rating: 5,
                      comment:
                        "I was impressed by the agent's professionalism and dedication. They were always available to answer my questions and guided me through the entire selling process. My house sold within two weeks at above asking price!",
                      image:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                    },
                    {
                      name: "Sarah Thompson",
                      date: "August 22, 2023",
                      rating: 5,
                      comment:
                        "As a first-time homebuyer, I was nervous about the process, but this agent made everything so easy to understand. They were patient, thorough, and genuinely cared about finding me the right home. I couldn't be happier with my purchase!",
                      image:
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
                    },
                  ].map((review, index) => (
                    <div key={index} className="rounded-lg border p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={review.image || "/placeholder.svg"}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold">Contact {agent.FirstName}</h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium">
                        Your Name
                      </label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Your Email
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                        Your Phone
                      </label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1 block text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="I'm interested in buying/selling a property..."
                        className="h-32"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>

                  <div className="mt-6 space-y-4">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Schedule Meeting</span>
                    </Button>
                  </div>

                  <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <h3 className="mb-2 font-medium">Working Hours</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
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
            <p className="mt-2 text-xs">Images courtesy of Unsplash</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
