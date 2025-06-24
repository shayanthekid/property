"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Mock data - in a real app, this would come from a database
const initialProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, New York",
    price: 2500,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    status: "Available",
    amenities: ["wifi", "parking", "fitness"],
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, New York",
    price: 5000,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    featured: false,
    status: "Available",
    amenities: ["pool", "kitchen", "ac", "security", "concierge"],
  },
  {
    id: 3,
    title: "Cozy Studio Loft",
    location: "Brooklyn, New York",
    price: 1800,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    status: "Rented",
    amenities: ["laundry", "balcony", "elevator", "pet"],
  },
]

// Available amenities with icons
const availableAmenities = [
  { id: "wifi", name: "High-speed WiFi", icon: "Wifi" },
  { id: "parking", name: "Parking included", icon: "Car" },
  { id: "fitness", name: "Fitness center", icon: "Dumbbell" },
  { id: "pool", name: "Swimming pool", icon: "Waves" },
  { id: "kitchen", name: "Modern kitchen", icon: "ChefHat" },
  { id: "ac", name: "Air conditioning", icon: "Wind" },
  { id: "security", name: "Security system", icon: "Camera" },
  { id: "concierge", name: "24/7 concierge", icon: "Shield" },
  { id: "laundry", name: "In-unit laundry", icon: "Shirt" },
  { id: "balcony", name: "Private balcony", icon: "Home" },
  { id: "elevator", name: "Elevator access", icon: "ArrowUp" },
  { id: "pet", name: "Pet friendly", icon: "Heart" },
]

export default function AdminPage() {
  const [properties, setProperties] = useState(initialProperties)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    featured: false,
    status: "Available",
    images: [],
    amenities: [], // Add this line
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)

    // Create preview URLs
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setUploadedImages(imageUrls)
    handleInputChange("images", imageUrls)
  }

  const removeImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index)
    const newFiles = imageFiles.filter((_, i) => i !== index)
    setUploadedImages(newImages)
    setImageFiles(newFiles)
    handleInputChange("images", newImages)
  }

  const handleAmenityToggle = (amenityId) => {
    const currentAmenities = formData.amenities || []
    const isSelected = currentAmenities.includes(amenityId)

    if (isSelected) {
      handleInputChange(
        "amenities",
        currentAmenities.filter((id) => id !== amenityId),
      )
    } else {
      handleInputChange("amenities", [...currentAmenities, amenityId])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with data:", formData)

    // Validate required fields
    if (
      !formData.title ||
      !formData.location ||
      !formData.price ||
      !formData.type ||
      !formData.bedrooms ||
      !formData.bathrooms
    ) {
      alert("Please fill in all required fields")
      return
    }

    const propertyData = {
      ...formData,
      price: Number.parseInt(formData.price),
      bedrooms: Number.parseInt(formData.bedrooms),
      bathrooms: Number.parseInt(formData.bathrooms),
      amenities: formData.amenities || [],
    }

    if (editingProperty) {
      // Update existing property
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingProperty.id
            ? {
                ...p,
                ...propertyData,
              }
            : p,
        ),
      )
      setEditingProperty(null)
    } else {
      // Add new property
      const newProperty = {
        id: Date.now(),
        ...propertyData,
        rating: 0,
        reviews: 0,
        image: uploadedImages.length > 0 ? uploadedImages[0] : "/placeholder.svg?height=200&width=300",
      }
      setProperties((prev) => [...prev, newProperty])
    }

    // Reset form
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      description: property.description || "",
      featured: property.featured,
      status: property.status,
      images: [],
      amenities: property.amenities || [], // Add this line
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  const resetForm = () => {
    console.log("Resetting form")
    setFormData({
      title: "",
      location: "",
      price: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      featured: false,
      status: "Available",
      images: [],
      amenities: [],
    })
    setUploadedImages([])
    setImageFiles([])
    setEditingProperty(null) // Make sure this is set to null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PropertyHub Admin</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/admin/bookings">
                <Button variant="outline">Bookings</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Site</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600 mt-2">Manage your property listings</p>
          </div>

          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              console.log("Dialog open state changing to:", open)
              setIsAddDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-rose-500 hover:bg-rose-600"
                onClick={() => {
                  console.log("Add Property button clicked")
                  setIsAddDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
                <DialogDescription>
                  {editingProperty
                    ? "Update the property details below."
                    : "Fill in the details to add a new property listing."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter property title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Monthly Rent ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="2500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                      placeholder="2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      placeholder="2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Rented">Rented</SelectItem>
                        <SelectItem value="Maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter property description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="images">Property Images</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-2"
                  />
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            width={100}
                            height={80}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={amenity.id}
                          checked={formData.amenities?.includes(amenity.id) || false}
                          onChange={() => handleAmenityToggle(amenity.id)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={amenity.id} className="text-sm cursor-pointer">
                          {amenity.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Selected: {formData.amenities?.length || 0} amenities
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured Property</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
                    {editingProperty ? "Update Property" : "Add Property"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {properties.filter((p) => p.status === "Available").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rented</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {properties.filter((p) => p.status === "Rented").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600">{properties.filter((p) => p.featured).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {property.featured && <Badge className="bg-rose-500">Featured</Badge>}
                  <Badge
                    variant={
                      property.status === "Available"
                        ? "default"
                        : property.status === "Rented"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  {property.rating > 0 && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{property.rating}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    {property.bedrooms} bed • {property.bathrooms} bath
                  </div>
                  <div className="text-xl font-bold">${property.price.toLocaleString()}/mo</div>
                </div>

                {/* Amenities Preview */}
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenityId) => {
                        const amenity = availableAmenities.find((a) => a.id === amenityId)
                        return amenity ? (
                          <Badge key={amenityId} variant="outline" className="text-xs">
                            {amenity.name}
                          </Badge>
                        ) : null
                      })}
                      {property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Link href={`/property/${property.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No properties found</div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-rose-500 hover:bg-rose-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
