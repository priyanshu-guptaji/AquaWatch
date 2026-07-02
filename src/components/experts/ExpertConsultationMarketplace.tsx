"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Video, Star, Clock, MapPin, Calendar, Phone, MessageSquare, Award, Search, Filter, Zap } from "lucide-react"

interface Expert {
  id: string
  name: string
  title: string
  specialization: string[]
  experience: number
  rating: number
  reviewCount: number
  location: string
  languages: string[]
  hourlyRate: number
  availability: "available" | "busy" | "offline"
  profileImage: string
  bio: string
  credentials: string[]
  consultationTypes: ("video" | "phone" | "chat")[]
  responseTime: string
  successRate: number
}

interface Consultation {
  id: string
  expertId: string
  expertName: string
  type: "video" | "phone" | "chat"
  topic: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  price: number
  notes?: string
}

export default function ExpertConsultationMarketplace() {
  const [experts, setExperts] = useState<Expert[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [bookingForm, setBookingForm] = useState({
    type: "video" as const,
    topic: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock data initialization
  useEffect(() => {
    const mockExperts: Expert[] = [
      {
        id: "1",
        name: "Dr. Rajesh Kumar",
        title: "Senior Hydrogeologist",
        specialization: ["Groundwater Management", "Aquifer Analysis", "Water Quality Assessment"],
        experience: 15,
        rating: 4.9,
        reviewCount: 127,
        location: "New Delhi, India",
        languages: ["Hindi", "English", "Punjabi"],
        hourlyRate: 2500,
        availability: "available",
        profileImage: "/indian-hydrogeologist.jpg",
        bio: "Leading expert in groundwater contamination with 15+ years experience in fluoride and arsenic remediation across North India.",
        credentials: ["PhD Hydrogeology (IIT Delhi)", "Certified Water Quality Specialist", "CGWB Consultant"],
        consultationTypes: ["video", "phone", "chat"],
        responseTime: "< 2 hours",
        successRate: 94,
      },
      {
        id: "2",
        name: "Dr. Priya Sharma",
        title: "Public Health Specialist",
        specialization: ["Water-borne Diseases", "Community Health", "Maternal & Child Health"],
        experience: 12,
        rating: 4.8,
        reviewCount: 89,
        location: "Mumbai, Maharashtra",
        languages: ["Hindi", "English", "Marathi"],
        hourlyRate: 2000,
        availability: "available",
        profileImage: "/indian-female-doctor.png",
        bio: "Specialized in water-related health impacts with focus on vulnerable populations including pregnant women and children.",
        credentials: ["MD Community Medicine", "MPH (Johns Hopkins)", "WHO Consultant"],
        consultationTypes: ["video", "phone"],
        responseTime: "< 4 hours",
        successRate: 96,
      },
      {
        id: "3",
        name: "Eng. Amit Patel",
        title: "Water Treatment Engineer",
        specialization: ["Water Purification Systems", "RO Technology", "Industrial Treatment"],
        experience: 10,
        rating: 4.7,
        reviewCount: 156,
        location: "Ahmedabad, Gujarat",
        languages: ["Gujarati", "Hindi", "English"],
        hourlyRate: 1800,
        availability: "busy",
        profileImage: "/indian-engineer.jpg",
        bio: "Expert in designing cost-effective water treatment solutions for rural and urban communities.",
        credentials: ["B.Tech Chemical Engineering", "Certified Water Treatment Specialist", "ISO 9001 Auditor"],
        consultationTypes: ["video", "chat"],
        responseTime: "< 6 hours",
        successRate: 91,
      },
      {
        id: "4",
        name: "Dr. Meera Nair",
        title: "Environmental Scientist",
        specialization: ["Contamination Assessment", "Environmental Impact", "Remediation Planning"],
        experience: 8,
        rating: 4.6,
        reviewCount: 73,
        location: "Kochi, Kerala",
        languages: ["Malayalam", "Tamil", "English"],
        hourlyRate: 1500,
        availability: "available",
        profileImage: "/indian-environmental-scientist.jpg",
        bio: "Focused on environmental contamination assessment and sustainable remediation strategies.",
        credentials: ["PhD Environmental Science", "Certified Environmental Auditor", "UNEP Consultant"],
        consultationTypes: ["video", "phone", "chat"],
        responseTime: "< 3 hours",
        successRate: 89,
      },
    ]

    const mockConsultations: Consultation[] = [
      {
        id: "1",
        expertId: "1",
        expertName: "Dr. Rajesh Kumar",
        type: "video",
        topic: "Fluoride Contamination Solutions",
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: 60,
        status: "scheduled",
        price: 2500,
        notes: "Need urgent advice on defluoridation plant setup for village of 500 people",
      },
      {
        id: "2",
        expertId: "2",
        expertName: "Dr. Priya Sharma",
        type: "phone",
        topic: "Health Impact Assessment",
        scheduledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        duration: 45,
        status: "completed",
        price: 1500,
      },
    ]

    setExperts(mockExperts)
    setConsultations(mockConsultations)
  }, [])

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialization.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialization =
      selectedSpecialization === "all" ||
      expert.specialization.some((spec) => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()))
    return matchesSearch && matchesSpecialization
  })

  const handleBookConsultation = async () => {
    if (!selectedExpert) return

    setIsLoading(true)

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newConsultation: Consultation = {
      id: Date.now().toString(),
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      type: bookingForm.type,
      topic: bookingForm.topic,
      scheduledAt: new Date(`${bookingForm.preferredDate}T${bookingForm.preferredTime}`),
      duration: 60,
      status: "scheduled",
      price: selectedExpert.hourlyRate,
      notes: bookingForm.description,
    }

    setConsultations((prev) => [newConsultation, ...prev])
    setBookingForm({
      type: "video",
      topic: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
    })
    setSelectedExpert(null)
    setIsLoading(false)
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "ongoing":
        return "bg-green-500"
      case "completed":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Expert Consultation Marketplace</h2>
          <p className="text-gray-600 mt-2">Connect with water quality experts for personalized guidance</p>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {experts.length} Verified Experts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="find-experts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="find-experts">Find Experts</TabsTrigger>
          <TabsTrigger value="my-consultations">My Consultations</TabsTrigger>
        </TabsList>

        <TabsContent value="find-experts" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search experts by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="groundwater">Groundwater Management</SelectItem>
                <SelectItem value="health">Public Health</SelectItem>
                <SelectItem value="treatment">Water Treatment</SelectItem>
                <SelectItem value="contamination">Contamination Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expert Cards */}
          <div className="grid gap-6">
            {filteredExperts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={expert.profileImage || "/placeholder.svg"} alt={expert.name} />
                          <AvatarFallback>
                            {expert.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getAvailabilityColor(expert.availability)} border-2 border-white`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{expert.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {expert.experience}+ years
                          </Badge>
                        </div>
                        <p className="text-gray-600 font-medium mb-2">{expert.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{expert.rating}</span>
                            <span>({expert.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{expert.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Responds {expert.responseTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {expert.specialization.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-green-500" />
                            <span>{expert.successRate}% Success Rate</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {expert.consultationTypes.map((type) => (
                              <div key={type} className="flex items-center gap-1">
                                {type === "video" && <Video className="h-4 w-4 text-blue-500" />}
                                {type === "phone" && <Phone className="h-4 w-4 text-green-500" />}
                                {type === "chat" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">₹{expert.hourlyRate}</div>
                        <div className="text-sm text-gray-500">per hour</div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedExpert(expert)}
                            disabled={expert.availability === "offline"}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Consultation
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Book Consultation with {expert.name}</DialogTitle>
                            <DialogDescription>
                              Schedule a consultation to get expert advice on your water quality concerns.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Consultation Type</label>
                              <Select
                                value={bookingForm.type}
                                onValueChange={(value: any) => setBookingForm((prev) => ({ ...prev, type: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {expert.consultationTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      <div className="flex items-center gap-2">
                                        {type === "video" && <Video className="h-4 w-4" />}
                                        {type === "phone" && <Phone className="h-4 w-4" />}
                                        {type === "chat" && <MessageSquare className="h-4 w-4" />}
                                        {type.charAt(0).toUpperCase() + type.slice(1)} Call
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Topic</label>
                              <Input
                                placeholder="e.g., Fluoride contamination in village wells"
                                value={bookingForm.topic}
                                onChange={(e) => setBookingForm((prev) => ({ ...prev, topic: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea
                                placeholder="Provide details about your water quality issue..."
                                value={bookingForm.description}
                                onChange={(e) => setBookingForm((prev) => ({ ...prev, description: e.target.value }))}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Preferred Date</label>
                                <Input
                                  type="date"
                                  value={bookingForm.preferredDate}
                                  onChange={(e) =>
                                    setBookingForm((prev) => ({ ...prev, preferredDate: e.target.value }))
                                  }
                                  min={new Date().toISOString().split("T")[0]}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Preferred Time</label>
                                <Input
                                  type="time"
                                  value={bookingForm.preferredTime}
                                  onChange={(e) =>
                                    setBookingForm((prev) => ({ ...prev, preferredTime: e.target.value }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t">
                              <div className="text-lg font-semibold">Total: ₹{expert.hourlyRate}</div>
                              <Button
                                onClick={handleBookConsultation}
                                disabled={
                                  isLoading ||
                                  !bookingForm.topic ||
                                  !bookingForm.preferredDate ||
                                  !bookingForm.preferredTime
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                {isLoading ? "Booking..." : "Confirm Booking"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-consultations" className="space-y-4">
          <div className="grid gap-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {consultation.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
                        {consultation.type === "phone" && <Phone className="h-5 w-5 text-green-500" />}
                        {consultation.type === "chat" && <MessageSquare className="h-5 w-5 text-purple-500" />}
                        <h3 className="font-semibold">{consultation.topic}</h3>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(consultation.status)} text-white`}>
                      {consultation.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <label className="text-gray-500">Expert</label>
                      <p className="font-medium">{consultation.expertName}</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Scheduled</label>
                      <p className="font-medium">{consultation.scheduledAt.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Duration</label>
                      <p className="font-medium">{consultation.duration} minutes</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Price</label>
                      <p className="font-medium">₹{consultation.price}</p>
                    </div>
                  </div>
                  {consultation.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-500">Notes</label>
                      <p className="text-sm mt-1">{consultation.notes}</p>
                    </div>
                  )}
                  {consultation.status === "scheduled" && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Video className="h-4 w-4 mr-2" />
                        Join Call
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
