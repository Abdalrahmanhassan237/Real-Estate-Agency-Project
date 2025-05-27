import Image from "next/image"
import Link from "next/link"
import { Building, CheckCircle, Clock, Mail, MapPin, Phone, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AboutPage() {
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
            <Link href="/about" className="font-medium font-bold text-blue-600">
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
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h1 className="mb-6 text-4xl font-bold md:text-5xl">About RealEstate Pro</h1>
                <p className="mb-8 text-lg text-gray-600">
                  We're more than just a real estate company. We're your trusted partner in finding the perfect property
                  that meets your needs and exceeds your expectations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/properties">
                    <Button size="lg">Browse Properties</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
                  alt="RealEstate Pro Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <p className="mb-8 text-lg text-gray-600">
                Founded in 2010, RealEstate Pro began with a simple mission: to make property buying, selling, and
                renting a seamless and enjoyable experience. What started as a small team of passionate real estate
                enthusiasts has grown into a trusted company with a nationwide presence.
              </p>
              <p className="text-lg text-gray-600">
                Over the years, we've helped thousands of clients find their dream homes, sell properties at great
                values, and make smart real estate investments. Our journey has been defined by our commitment to
                excellence, integrity, and putting our clients' needs first.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Mission & Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Client-Centered Approach</h3>
                  <p className="text-gray-600">
                    We put our clients at the center of everything we do, ensuring their needs and preferences guide our
                    recommendations and actions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Integrity & Transparency</h3>
                  <p className="text-gray-600">
                    We operate with the highest ethical standards, providing honest advice and transparent information
                    throughout the entire process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Continuous Innovation</h3>
                  <p className="text-gray-600">
                    We constantly seek new ways to improve our services, leveraging technology and market insights to
                    stay ahead of the curve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Meet Our Leadership Team</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Founder",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                  bio: "With over 15 years in real estate, Sarah founded RealEstate Pro with a vision to transform the industry.",
                },
                {
                  name: "Michael Brown",
                  role: "Chief Operations Officer",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                  bio: "Michael oversees all operational aspects, ensuring we deliver exceptional service to every client.",
                },
                {
                  name: "Jennifer Lee",
                  role: "Head of Sales",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                  bio: "Jennifer leads our sales team with a focus on building lasting relationships and exceeding targets.",
                },
                {
                  name: "David Wilson",
                  role: "Chief Marketing Officer",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                  bio: "David drives our marketing strategies, keeping RealEstate Pro at the forefront of the industry.",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="mb-3 text-blue-600">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/agents">
                <Button size="lg">View All Team Members</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">What Our Clients Say</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Emily Davis",
                  location: "New York, NY",
                  quote:
                    "RealEstate Pro helped me find my dream apartment in just two weeks! Their team was incredibly responsive and understood exactly what I was looking for.",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
                },
                {
                  name: "Robert Miller",
                  location: "Los Angeles, CA",
                  quote:
                    "Selling our family home was an emotional process, but the team at RealEstate Pro guided us with compassion and professionalism. We got more than our asking price!",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                },
                {
                  name: "Lisa Thompson",
                  location: "Chicago, IL",
                  quote:
                    "As a first-time homebuyer, I had countless questions. RealEstate Pro was patient, educational, and made the entire process stress-free. I couldn't be happier with my new home.",
                  image:
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="italic text-gray-600">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Achievements */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Achievements</h2>
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <div className="mb-2 text-4xl font-bold text-blue-600">5,000+</div>
                <p className="text-lg text-gray-600">Properties Sold</p>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-blue-600">10,000+</div>
                <p className="text-lg text-gray-600">Happy Clients</p>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-blue-600">15+</div>
                <p className="text-lg text-gray-600">Years of Experience</p>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-blue-600">20+</div>
                <p className="text-lg text-gray-600">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Have questions about our company or services? We'd love to hear from you. Reach out to us using the
                  contact information below or fill out the form.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold">Our Headquarters</h3>
                      <p className="text-gray-600">123 Real Estate St., Property City, PC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-gray-600">+1 (123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-gray-600">info@realestatepro.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Subject" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="mb-1 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
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
