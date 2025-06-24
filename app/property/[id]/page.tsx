import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  ChefHat,
  Wind,
  Camera,
  Shield,
  Bed,
  Bath,
  Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BookingForm from "./booking"

// Mock property data
const property = {
  id: 1,
  title: "Modern Downtown Apartment",
  location: "Downtown, New York",
  price: 2500,
  rating: 4.8,
  reviews: 124,
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  description:
    "Experience luxury living in this stunning modern apartment located in the heart of downtown. This beautifully designed space features floor-to-ceiling windows, premium finishes, and breathtaking city views. Perfect for professionals and couples seeking a sophisticated urban lifestyle.",
  amenities: [
    { icon: Wifi, name: "High-speed WiFi" },
    { icon: Car, name: "Parking included" },
    { icon: Dumbbell, name: "Fitness center" },
    { icon: Waves, name: "Swimming pool" },
    { icon: ChefHat, name: "Modern kitchen" },
    { icon: Wind, name: "Air conditioning" },
    { icon: Camera, name: "Security system" },
    { icon: Shield, name: "24/7 concierge" },
  ],
  features: [
    "Floor-to-ceiling windows",
    "Hardwood floors throughout",
    "Stainless steel appliances",
    "In-unit washer/dryer",
    "Walk-in closets",
    "Private balcony",
  ],
  agent: {
    name: "Sarah Johnson",
    title: "Senior Property Manager",
    phone: "+1 (555) 123-4567",
    email: "sarah@propertyhub.com",
    image: "/placeholder.svg?height=100&width=100",
  },
}

export default function PropertyDetailPage() {
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

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to properties
        </Link>

        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="lg:col-span-2 lg:row-span-2">
            <Image
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          {property.images.slice(1).map((image, index) => (
            <div key={index} className="aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} ${index + 2}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <div className="flex items-center space-x-6 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {property.type}
                </Badge>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.bedrooms} bedrooms
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms} bathrooms
                  </div>
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {property.area} sq ft
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <amenity.icon className="w-6 h-6 text-gray-600 mb-2" />
                    <span className="text-sm text-gray-700 text-center">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Form */}
            <BookingForm propertyId={property.id} propertyPrice={property.price} propertyTitle={property.title} />

            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Property Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={property.agent.image || "/placeholder.svg"} alt={property.agent.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{property.agent.name}</h4>
                    <p className="text-sm text-gray-600">{property.agent.title}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{property.agent.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Square Footage</span>
                  <span className="font-medium">{property.area} sq ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available</span>
                  <span className="font-medium text-green-600">Now</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lease Term</span>
                  <span className="font-medium">12+ months</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
