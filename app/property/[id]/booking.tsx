"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock existing bookings - in a real app, this would come from a database
const existingBookings = [
  {
    id: 1,
    propertyId: 1,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "confirmed",
  },
  {
    id: 2,
    propertyId: 1,
    startDate: "2024-01-25",
    endDate: "2024-01-30",
    status: "confirmed",
  },
]

interface BookingFormProps {
  propertyId: number
  propertyPrice: number
  propertyTitle: string
}

export default function BookingForm({ propertyId, propertyPrice, propertyTitle }: BookingFormProps) {
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    guests: "1",
    message: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
    setBookingError("")
  }

  const checkAvailability = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    return !existingBookings.some((booking) => {
      if (booking.propertyId !== propertyId) return false

      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)

      return start <= bookingEnd && end >= bookingStart
    })
  }

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const days = calculateDays()
    return days * propertyPrice
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setBookingError("")

    // Validation
    if (!bookingData.startDate || !bookingData.endDate) {
      setBookingError("Please select both start and end dates")
      setIsSubmitting(false)
      return
    }

    if (new Date(bookingData.startDate) >= new Date(bookingData.endDate)) {
      setBookingError("End date must be after start date")
      setIsSubmitting(false)
      return
    }

    if (new Date(bookingData.startDate) < new Date()) {
      setBookingError("Start date cannot be in the past")
      setIsSubmitting(false)
      return
    }

    if (!checkAvailability(bookingData.startDate, bookingData.endDate)) {
      setBookingError("Selected dates are not available")
      setIsSubmitting(false)
      return
    }

    if (!bookingData.contactName || !bookingData.contactEmail) {
      setBookingError("Please provide your contact information")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add booking to mock data (in real app, this would be saved to database)
    existingBookings.push({
      id: Date.now(),
      propertyId,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      status: "pending",
    })

    setBookingSuccess(true)
    setIsSubmitting(false)
  }

  if (bookingSuccess) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Request Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Your booking request for {propertyTitle} has been submitted successfully. We'll contact you within 24 hours
            to confirm your reservation.
          </p>
          <Button onClick={() => setBookingSuccess(false)} variant="outline">
            Make Another Booking
          </Button>
        </CardContent>
      </Card>
    )
  }

  const days = calculateDays()
  const total = calculateTotal()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Book This Property
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Check-in Date</Label>
              <Input
                id="startDate"
                type="date"
                value={bookingData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">Check-out Date</Label>
              <Input
                id="endDate"
                type="date"
                value={bookingData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                min={bookingData.startDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Check-in Time</Label>
              <Select value={bookingData.startTime} onValueChange={(value) => handleInputChange("startTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="endTime">Check-out Time</Label>
              <Select value={bookingData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Guests */}
          <div>
            <Label htmlFor="guests">Number of Guests</Label>
            <Select value={bookingData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Contact Information</h4>
            <div>
              <Label htmlFor="contactName">Full Name</Label>
              <Input
                id="contactName"
                value={bookingData.contactName}
                onChange={(e) => handleInputChange("contactName", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input
                id="contactEmail"
                type="email"
                value={bookingData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={bookingData.contactPhone}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea
              id="message"
              value={bookingData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any special requests or questions?"
              rows={3}
            />
          </div>

          {/* Pricing Summary */}
          {days > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>
                  ${propertyPrice.toLocaleString()} × {days} {days === 1 ? "day" : "days"}
                </span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {bookingError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{bookingError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Request..." : "Request Booking"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            You won't be charged yet. We'll contact you to confirm your booking.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
