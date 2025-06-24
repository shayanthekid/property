import { Search, MapPin, Star, Heart, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from a database
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, New York",
    price: 2500,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=400",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, New York",
    price: 5000,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    featured: false,
  },
  {
    id: 3,
    title: "Cozy Studio Loft",
    location: "Brooklyn, New York",
    price: 1800,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=400",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
  },
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Queens, New York",
    price: 3200,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    featured: true,
  },
  {
    id: 5,
    title: "Elegant Townhouse",
    location: "Upper East Side, New York",
    price: 4500,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    featured: false,
  },
  {
    id: 6,
    title: "Waterfront Condo",
    location: "Battery Park, New York",
    price: 3800,
    rating: 4.9,
    reviews: 91,
    image: "/placeholder.svg?height=300&width=400",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Properties
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-rose-500"> Property</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover premium properties in prime locations. Quality homes for modern living.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
                <div className="flex-1 flex items-center px-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <Input placeholder="Where do you want to live?" className="border-0 focus-visible:ring-0 text-lg" />
                </div>
                <div className="hidden md:flex items-center px-4 border-l">
                  <Filter className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Filters</span>
                </div>
                <Button size="lg" className="rounded-full bg-rose-500 hover:bg-rose-600">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties
              .filter((p) => p.featured)
              .map((property) => (
                <Link key={property.id} href={`/property/${property.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Badge className="absolute top-3 left-3 bg-rose-500">Featured</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-rose-500 transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{property.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {property.bedrooms} bed • {property.bathrooms} bath
                        </div>
                        <div className="text-xl font-bold text-gray-900">${property.price.toLocaleString()}/mo</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* All Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Properties</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    {property.featured && <Badge className="absolute top-3 left-3 bg-rose-500">Featured</Badge>}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-rose-500 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {property.bedrooms} bed • {property.bathrooms} bath
                      </div>
                      <div className="text-xl font-bold text-gray-900">${property.price.toLocaleString()}/mo</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold">PropertyHub</span>
              </div>
              <p className="text-gray-400">Premium properties in prime locations for modern living.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Properties</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    New Listings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
