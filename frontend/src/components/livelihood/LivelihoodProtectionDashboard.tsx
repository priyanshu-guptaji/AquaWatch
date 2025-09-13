"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sprout,
  Sun,
  Briefcase,
  Shield,
  TrendingUp,
  AlertTriangle,
  IndianRupee,
  Droplets,
  Zap,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react"

interface FarmData {
  id: string
  farmerName: string
  location: string
  farmSize: number // in acres
  cropType: string
  groundwaterLevel: number // in meters
  safeLevel: number // minimum safe level for farming
  currentSeason: string
  insuranceStatus: "active" | "triggered" | "expired" | "none"
  riskScore: number // 0-100
  estimatedLoss: number // in INR
}

interface SolarPumpRecommendation {
  id: string
  farmId: string
  pumpCapacity: string
  estimatedCost: number
  subsidyAmount: number
  paybackPeriod: number // in months
  waterAvailability: number // percentage
  financingOptions: {
    provider: string
    interestRate: number
    tenure: number
    emiAmount: number
  }[]
  eligibilityScore: number
}

interface AlternativeLivelihood {
  id: string
  title: string
  category: "agriculture" | "livestock" | "handicrafts" | "services" | "technology"
  description: string
  initialInvestment: number
  monthlyIncome: number
  skillsRequired: string[]
  trainingAvailable: boolean
  marketDemand: "high" | "medium" | "low"
  suitableFor: string[]
  location: string
}

export default function LivelihoodProtectionDashboard() {
  const [farmData, setFarmData] = useState<FarmData[]>([])
  const [solarRecommendations, setSolarRecommendations] = useState<SolarPumpRecommendation[]>([])
  const [alternativeLivelihoods, setAlternativeLivelihoods] = useState<AlternativeLivelihood[]>([])
  const [selectedFarm, setSelectedFarm] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data initialization
  useEffect(() => {
    const mockFarmData: FarmData[] = [
      {
        id: "1",
        farmerName: "राम कुमार",
        location: "Rajasthan - Jaipur",
        farmSize: 5.5,
        cropType: "Wheat & Mustard",
        groundwaterLevel: 45.2,
        safeLevel: 50.0,
        currentSeason: "Rabi 2024",
        insuranceStatus: "triggered",
        riskScore: 85,
        estimatedLoss: 125000,
      },
      {
        id: "2",
        farmerName: "Priya Patel",
        location: "Gujarat - Kutch",
        farmSize: 8.0,
        cropType: "Cotton",
        groundwaterLevel: 38.7,
        safeLevel: 45.0,
        currentSeason: "Kharif 2024",
        insuranceStatus: "triggered",
        riskScore: 92,
        estimatedLoss: 180000,
      },
      {
        id: "3",
        farmerName: "Suresh Reddy",
        location: "Andhra Pradesh - Anantapur",
        farmSize: 3.2,
        cropType: "Groundnut",
        groundwaterLevel: 52.1,
        safeLevel: 48.0,
        currentSeason: "Kharif 2024",
        insuranceStatus: "active",
        riskScore: 35,
        estimatedLoss: 0,
      },
    ]

    const mockSolarRecommendations: SolarPumpRecommendation[] = [
      {
        id: "1",
        farmId: "1",
        pumpCapacity: "5 HP Solar Pump",
        estimatedCost: 350000,
        subsidyAmount: 210000,
        paybackPeriod: 36,
        waterAvailability: 78,
        financingOptions: [
          {
            provider: "NABARD",
            interestRate: 4.5,
            tenure: 60,
            emiAmount: 2890,
          },
          {
            provider: "SBI Agri Loan",
            interestRate: 6.2,
            tenure: 48,
            emiAmount: 3450,
          },
        ],
        eligibilityScore: 88,
      },
      {
        id: "2",
        farmId: "2",
        pumpCapacity: "7.5 HP Solar Pump",
        estimatedCost: 485000,
        subsidyAmount: 291000,
        paybackPeriod: 42,
        waterAvailability: 65,
        financingOptions: [
          {
            provider: "NABARD",
            interestRate: 4.5,
            tenure: 60,
            emiAmount: 4020,
          },
        ],
        eligibilityScore: 92,
      },
    ]

    const mockAlternativeLivelihoods: AlternativeLivelihood[] = [
      {
        id: "1",
        title: "Organic Vegetable Farming",
        category: "agriculture",
        description: "High-value organic vegetable cultivation using drip irrigation and minimal water requirements",
        initialInvestment: 75000,
        monthlyIncome: 25000,
        skillsRequired: ["Organic farming techniques", "Pest management", "Marketing"],
        trainingAvailable: true,
        marketDemand: "high",
        suitableFor: ["Small farmers", "Women farmers", "Young entrepreneurs"],
        location: "All regions",
      },
      {
        id: "2",
        title: "Dairy Farming & Processing",
        category: "livestock",
        description: "Small-scale dairy operation with value-added products like paneer, ghee, and yogurt",
        initialInvestment: 150000,
        monthlyIncome: 35000,
        skillsRequired: ["Animal husbandry", "Milk processing", "Quality control"],
        trainingAvailable: true,
        marketDemand: "high",
        suitableFor: ["Rural families", "Women self-help groups"],
        location: "All regions",
      },
      {
        id: "3",
        title: "Handicrafts & Textiles",
        category: "handicrafts",
        description: "Traditional handicrafts and textile production for domestic and export markets",
        initialInvestment: 25000,
        monthlyIncome: 18000,
        skillsRequired: ["Traditional crafts", "Design", "Quality finishing"],
        trainingAvailable: true,
        marketDemand: "medium",
        suitableFor: ["Women", "Elderly", "Artisan families"],
        location: "Rajasthan, Gujarat, West Bengal",
      },
      {
        id: "4",
        title: "Agri-Tech Services",
        category: "technology",
        description: "Drone services, soil testing, and digital farming consultancy for other farmers",
        initialInvestment: 200000,
        monthlyIncome: 45000,
        skillsRequired: ["Technology operation", "Data analysis", "Customer service"],
        trainingAvailable: true,
        marketDemand: "high",
        suitableFor: ["Educated youth", "Tech-savvy farmers"],
        location: "All regions",
      },
      {
        id: "5",
        title: "Water Purification Services",
        category: "services",
        description: "Community water purification and distribution services in contaminated areas",
        initialInvestment: 300000,
        monthlyIncome: 40000,
        skillsRequired: ["Water treatment", "Equipment maintenance", "Business management"],
        trainingAvailable: true,
        marketDemand: "high",
        suitableFor: ["Entrepreneurs", "Community groups"],
        location: "High contamination areas",
      },
    ]

    setFarmData(mockFarmData)
    setSolarRecommendations(mockSolarRecommendations)
    setAlternativeLivelihoods(mockAlternativeLivelihoods)
    setIsLoading(false)
  }, [])

  const getInsuranceStatusColor = (status: string) => {
    switch (status) {
      case "triggered":
        return "bg-red-500"
      case "active":
        return "bg-green-500"
      case "expired":
        return "bg-yellow-500"
      case "none":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "agriculture":
        return <Sprout className="h-4 w-4 text-green-600" />
      case "livestock":
        return <Users className="h-4 w-4 text-blue-600" />
      case "handicrafts":
        return <Briefcase className="h-4 w-4 text-purple-600" />
      case "services":
        return <Zap className="h-4 w-4 text-orange-600" />
      case "technology":
        return <Sun className="h-4 w-4 text-blue-500" />
      default:
        return <Briefcase className="h-4 w-4 text-gray-600" />
    }
  }

  const triggeredInsurance = farmData.filter((farm) => farm.insuranceStatus === "triggered")
  const totalEstimatedLoss = farmData.reduce((sum, farm) => sum + farm.estimatedLoss, 0)
  const averageRiskScore = Math.round(farmData.reduce((sum, farm) => sum + farm.riskScore, 0) / farmData.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Livelihood Protection Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Comprehensive support system for farmers facing water scarcity challenges
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {triggeredInsurance.length} Insurance Claims Active
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Insurance Triggered</p>
                <p className="text-2xl font-bold text-red-600">{triggeredInsurance.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <IndianRupee className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Loss</p>
                <p className="text-2xl font-bold">₹{(totalEstimatedLoss / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Risk Score</p>
                <p className="text-2xl font-bold">{averageRiskScore}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alt. Livelihoods</p>
                <p className="text-2xl font-bold">{alternativeLivelihoods.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insurance-triggers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insurance-triggers">Insurance Triggers</TabsTrigger>
          <TabsTrigger value="solar-financing">Solar Pump Financing</TabsTrigger>
          <TabsTrigger value="alternative-livelihoods">Alternative Livelihoods</TabsTrigger>
        </TabsList>

        <TabsContent value="insurance-triggers" className="space-y-4">
          <div className="grid gap-4">
            {farmData.map((farm) => (
              <Card
                key={farm.id}
                className={`border-l-4 ${farm.insuranceStatus === "triggered" ? "border-l-red-500" : "border-l-green-500"}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{farm.farmerName}</CardTitle>
                      <CardDescription>
                        {farm.location} • {farm.farmSize} acres • {farm.cropType}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getInsuranceStatusColor(farm.insuranceStatus)} text-white`}>
                        {farm.insuranceStatus.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getRiskColor(farm.riskScore)}`}>{farm.riskScore}</div>
                        <div className="text-sm text-gray-500">Risk Score</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Current Water Level</label>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-lg font-bold">{farm.groundwaterLevel}m</span>
                      </div>
                      <Progress value={(farm.groundwaterLevel / farm.safeLevel) * 100} className="h-2" />
                      <div className="text-xs text-gray-500">Safe level: {farm.safeLevel}m</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Current Season</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{farm.currentSeason}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Estimated Loss</label>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-red-500" />
                        <span className="text-lg font-bold text-red-600">₹{farm.estimatedLoss.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {farm.insuranceStatus === "triggered" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Insurance Claim Triggered:</strong> Groundwater level has dropped below safe farming
                        threshold. Automatic compensation of ₹{farm.estimatedLoss.toLocaleString()} will be processed
                        within 7 days.
                      </AlertDescription>
                    </Alert>
                  )}

                  {farm.groundwaterLevel < farm.safeLevel && farm.insuranceStatus !== "triggered" && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <strong>Warning:</strong> Water level approaching critical threshold. Insurance trigger will
                        activate if level drops below {farm.safeLevel - 2}m.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solar-financing" className="space-y-4">
          <div className="grid gap-4">
            {solarRecommendations.map((recommendation) => {
              const farm = farmData.find((f) => f.id === recommendation.farmId)
              return (
                <Card key={recommendation.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Sun className="h-5 w-5 text-yellow-500" />
                          {recommendation.pumpCapacity} Recommendation
                        </CardTitle>
                        <CardDescription>
                          For {farm?.farmerName} • {farm?.location} • {farm?.farmSize} acres
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{recommendation.eligibilityScore}% Eligible</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Total Cost</label>
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{recommendation.estimatedCost.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Subsidy Amount</label>
                        <div className="text-2xl font-bold text-green-600">
                          ₹{recommendation.subsidyAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round((recommendation.subsidyAmount / recommendation.estimatedCost) * 100)}% subsidy
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Your Investment</label>
                        <div className="text-2xl font-bold text-orange-600">
                          ₹{(recommendation.estimatedCost - recommendation.subsidyAmount).toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Payback Period</label>
                        <div className="text-2xl font-bold text-purple-600">{recommendation.paybackPeriod} months</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Water Availability Forecast</label>
                      <Progress value={recommendation.waterAvailability} className="h-3" />
                      <div className="text-sm text-gray-500">
                        {recommendation.waterAvailability}% availability expected
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Financing Options</h4>
                      <div className="grid gap-3">
                        {recommendation.financingOptions.map((option, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{option.provider}</h5>
                              <Badge variant="outline">{option.interestRate}% Interest</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <label className="text-gray-500">EMI Amount</label>
                                <p className="font-medium">₹{option.emiAmount.toLocaleString()}/month</p>
                              </div>
                              <div>
                                <label className="text-gray-500">Tenure</label>
                                <p className="font-medium">{option.tenure} months</p>
                              </div>
                              <div>
                                <label className="text-gray-500">Total Interest</label>
                                <p className="font-medium">
                                  ₹
                                  {(
                                    option.emiAmount * option.tenure -
                                    (recommendation.estimatedCost - recommendation.subsidyAmount)
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Apply for Financing
                      </Button>
                      <Button variant="outline">Download Proposal</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="alternative-livelihoods" className="space-y-4">
          <div className="grid gap-4">
            {alternativeLivelihoods.map((livelihood) => (
              <Card key={livelihood.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(livelihood.category)}
                      <div>
                        <CardTitle className="text-lg">{livelihood.title}</CardTitle>
                        <CardDescription className="capitalize">{livelihood.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${livelihood.marketDemand === "high" ? "bg-green-500" : livelihood.marketDemand === "medium" ? "bg-yellow-500" : "bg-gray-500"} text-white`}
                      >
                        {livelihood.marketDemand.toUpperCase()} DEMAND
                      </Badge>
                      {livelihood.trainingAvailable && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Training Available
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{livelihood.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Initial Investment</label>
                      <div className="text-2xl font-bold text-red-600">
                        ₹{livelihood.initialInvestment.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Monthly Income</label>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{livelihood.monthlyIncome.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">ROI Period</label>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(livelihood.initialInvestment / livelihood.monthlyIncome)} months
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Skills Required</label>
                      <div className="flex flex-wrap gap-2">
                        {livelihood.skillsRequired.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Suitable For</label>
                      <div className="flex flex-wrap gap-2">
                        {livelihood.suitableFor.map((group, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Available in: {livelihood.location}</span>
                  </div>

                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Get Started
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Start Your Journey: {livelihood.title}</DialogTitle>
                          <DialogDescription>
                            Connect with training providers and get personalized guidance
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Name</label>
                            <Input placeholder="Enter your full name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input placeholder="Enter your phone number" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Current Location</label>
                            <Input placeholder="Enter your location" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Available Investment</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select investment range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-50000">₹0 - ₹50,000</SelectItem>
                                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                                <SelectItem value="100000-200000">₹1,00,000 - ₹2,00,000</SelectItem>
                                <SelectItem value="200000+">₹2,00,000+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Connect with Training Provider
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">Download Business Plan</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
