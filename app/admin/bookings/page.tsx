"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock booking data - in a real app, this would come from a database
const initialBookings = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Downtown Apartment",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 (555) 123-4567",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    startTime: "15:00",
    endTime: "11:00",
    guests: 2,
    message: "Looking forward to staying at your beautiful property!",
    status: "pending",
    createdAt: "2024-01-10T10:30:00Z",
    totalAmount: 12500,
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Luxury Penthouse Suite",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+1 (555) 987-6543",
    startDate: "2024-01-25",
    endDate: "2024-01-30",
    startTime: "14:00",
    endTime: "10:00",
    guests: 4,
    message: "Celebrating our anniversary. Any special arrangements possible?",
    status: "confirmed",
    createdAt: "2024-01-08T14:20:00Z",
    totalAmount: 25000,
  },
  {
    id: 3,
    propertyId: 1,
    propertyTitle: "Modern Downtown Apartment",
    customerName: "Mike Wilson",
    customerEmail: "mike.w@email.com",
    customerPhone: "+1 (555) 456-7890",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    startTime: "16:00",
    endTime: "12:00",
    guests: 1,
    message: "Business trip. Will need early check-in if possible.",
    status: "rejected",
    createdAt: "2024-01-12T09:15:00Z",
    totalAmount: 10000,
    rejectionReason: "Property not available for selected dates due to maintenance.",
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [responseMessage, setResponseMessage] = useState("")

  const updateBookingStatus = (bookingId: number, status: string, reason?: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status, rejectionReason: reason } : booking)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const allBookings = bookings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PropertyHub Admin</span>
            </Link>

            <div className="flex space-x-4">
              <Link href="/admin">
                <Button variant="outline">Properties</Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage property bookings and reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{confirmedBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Bookings ({allBookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BookingsList bookings={allBookings} onUpdateStatus={updateBookingStatus} />
          </TabsContent>

          <TabsContent value="pending">
            <BookingsList bookings={pendingBookings} onUpdateStatus={updateBookingStatus} />
          </TabsContent>

          <TabsContent value="confirmed">
            <BookingsList bookings={confirmedBookings} onUpdateStatus={updateBookingStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingsList({ bookings, onUpdateStatus }) {
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [responseMessage, setResponseMessage] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleConfirm = (booking) => {
    onUpdateStatus(booking.id, "confirmed")
  }

  const handleReject = (booking) => {
    onUpdateStatus(booking.id, "rejected", responseMessage)
    setResponseMessage("")
    setSelectedBooking(null)
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{booking.propertyTitle}</h3>
                <p className="text-gray-600">Booking #{booking.id}</p>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.guests} guests</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{formatDate(booking.startDate)}</p>
                  <p className="text-sm text-gray-600">to {formatDate(booking.endDate)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{formatTime(booking.startTime)}</p>
                  <p className="text-sm text-gray-600">to {formatTime(booking.endTime)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">${booking.totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total amount</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{booking.customerEmail}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{booking.customerPhone}</span>
              </div>
            </div>

            {booking.message && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm">{booking.message}</p>
                </div>
              </div>
            )}

            {booking.rejectionReason && (
              <div className="bg-red-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-red-800">
                  <strong>Rejection Reason:</strong> {booking.rejectionReason}
                </p>
              </div>
            )}

            {booking.status === "pending" && (
              <div className="flex space-x-2">
                <Button onClick={() => handleConfirm(booking)} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      <X className="w-4 h-4 mr-2" />
                      Reject Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Booking</DialogTitle>
                      <DialogDescription>Please provide a reason for rejecting this booking request.</DialogDescription>
                    </DialogHeader>
                    <div>
                      <Label htmlFor="reason">Rejection Reason</Label>
                      <Textarea
                        id="reason"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={3}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={() => handleReject(booking)} className="bg-red-600 hover:bg-red-700">
                        Reject Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">Bookings will appear here when customers make reservations.</p>
        </div>
      )}
    </div>
  )
}
