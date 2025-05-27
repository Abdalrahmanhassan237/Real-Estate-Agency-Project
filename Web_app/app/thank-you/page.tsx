import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Building, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
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
      <main className="flex flex-1 flex-col items-center justify-center py-20">
        <div className="text-center">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
          <h1 className="mt-6 text-3xl font-bold">Thank You!</h1>
          <p className="mt-4 text-xl text-gray-600">Your property has been submitted successfully.</p>
          <p className="mt-2 text-gray-600">Our team will review your listing and contact you shortly.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline">Browse Properties</Button>
            </Link>
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
