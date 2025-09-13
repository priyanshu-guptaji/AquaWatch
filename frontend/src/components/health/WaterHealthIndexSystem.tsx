"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Droplets,
  AlertTriangle,
  Users,
  Hospital,
  TrendingUp,
  TrendingDown,
  MapPin,
  Activity,
  Target,
  Zap,
} from "lucide-react"

interface WaterHealthMetrics {
  groundwaterLevel: number // 0-100
  contaminationRisk: number // 0-100
  populationVulnerability: number // 0-100
  healthcareAccess: number // 0-100
  overallScore: number // 0-100
  riskLevel: "low" | "medium" | "high" | "critical"
  trend: "improving" | "stable" | "declining"
}

interface VillageHealthData {
  id: string
  name: string
  district: string
  state: string
  population: number
  coordinates: [number, number]
  metrics: WaterHealthMetrics
  lastUpdated: Date
  vulnerablePopulation: {
    children: number
    pregnantWomen: number
    elderly: number
  }
  healthIndicators: {
    waterBorneDiseases: number
    malnutrition: number
    fluorosis: number
    arsenicosis: number
  }
  interventions: string[]
}

export default function WaterHealthIndexSystem() {
  const [villageData, setVillageData] = useState<VillageHealthData[]>([])
  const [selectedState, setSelectedState] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data initialization
  useEffect(() => {
    const generateMockData = () => {
      const mockVillages: VillageHealthData[] = [
        {
          id: "1",
          name: "Khetri Village",
          district: "Jhunjhunu",
          state: "Rajasthan",
          population: 2847,
          coordinates: [28.0, 75.8],
          metrics: {
            groundwaterLevel: 25, // Critical - very low
            contaminationRisk: 85, // High fluoride
            populationVulnerability: 78, // High vulnerable population
            healthcareAccess: 35, // Limited healthcare
            overallScore: 31,
            riskLevel: "critical",
            trend: "declining",
          },
          lastUpdated: new Date(),
          vulnerablePopulation: {
            children: 456,
            pregnantWomen: 89,
            elderly: 234,
          },
          healthIndicators: {
            waterBorneDiseases: 12.5, // per 1000
            malnutrition: 18.3,
            fluorosis: 34.7,
            arsenicosis: 0,
          },
          interventions: [
            "Defluoridation plant installation",
            "Alternative water source development",
            "Health screening camps",
          ],
        },
        {
          id: "2",
          name: "Sundarbans Village",
          district: "South 24 Parganas",
          state: "West Bengal",
          population: 1923,
          coordinates: [22.2, 88.8],
          metrics: {
            groundwaterLevel: 65,
            contaminationRisk: 92, // High arsenic
            populationVulnerability: 82,
            healthcareAccess: 28,
            overallScore: 26,
            riskLevel: "critical",
            trend: "declining",
          },
          lastUpdated: new Date(),
          vulnerablePopulation: {
            children: 298,
            pregnantWomen: 67,
            elderly: 189,
          },
          healthIndicators: {
            waterBorneDiseases: 15.2,
            malnutrition: 22.1,
            fluorosis: 0,
            arsenicosis: 28.9,
          },
          interventions: ["Arsenic removal filters", "Safe water distribution", "Medical treatment for arsenicosis"],
        },
        {
          id: "3",
          name: "Kutch Village",
          district: "Kutch",
          state: "Gujarat",
          population: 3456,
          coordinates: [23.7, 69.9],
          metrics: {
            groundwaterLevel: 45,
            contaminationRisk: 68, // Salinity issues
            populationVulnerability: 55,
            healthcareAccess: 62,
            overallScore: 58,
            riskLevel: "medium",
            trend: "stable",
          },
          lastUpdated: new Date(),
          vulnerablePopulation: {
            children: 567,
            pregnantWomen: 123,
            elderly: 345,
          },
          healthIndicators: {
            waterBorneDiseases: 8.7,
            malnutrition: 14.2,
            fluorosis: 5.3,
            arsenicosis: 0,
          },
          interventions: ["RO plant maintenance", "Rainwater harvesting", "Crop pattern modification"],
        },
        {
          id: "4",
          name: "Assam Valley Village",
          district: "Golaghat",
          state: "Assam",
          population: 2134,
          coordinates: [26.5, 93.9],
          metrics: {
            groundwaterLevel: 78,
            contaminationRisk: 35,
            populationVulnerability: 45,
            healthcareAccess: 72,
            overallScore: 75,
            riskLevel: "low",
            trend: "improving",
          },
          lastUpdated: new Date(),
          vulnerablePopulation: {
            children: 334,
            pregnantWomen: 78,
            elderly: 198,
          },
          healthIndicators: {
            waterBorneDiseases: 4.2,
            malnutrition: 8.9,
            fluorosis: 0,
            arsenicosis: 0,
          },
          interventions: ["Preventive health programs", "Water quality monitoring", "Community awareness"],
        },
      ]

      setVillageData(mockVillages)
      setIsLoading(false)
    }

    generateMockData()
  }, [])

  const calculateWaterHealthIndex = (metrics: WaterHealthMetrics): number => {
    // Weighted calculation of Water Health Index
    const weights = {
      groundwaterLevel: 0.25,
      contaminationRisk: 0.35, // Higher weight for contamination
      populationVulnerability: 0.25,
      healthcareAccess: 0.15,
    }

    // Invert contamination risk and vulnerability (lower is better)
    const score =
      metrics.groundwaterLevel * weights.groundwaterLevel +
      (100 - metrics.contaminationRisk) * weights.contaminationRisk +
      (100 - metrics.populationVulnerability) * weights.populationVulnerability +
      metrics.healthcareAccess * weights.healthcareAccess

    return Math.round(score)
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const filteredVillages = villageData.filter((village) => {
    const matchesState = selectedState === "all" || village.state === selectedState
    const matchesRisk = selectedRiskLevel === "all" || village.metrics.riskLevel === selectedRiskLevel
    return matchesState && matchesRisk
  })

  const overallStats = {
    totalVillages: villageData.length,
    criticalRisk: villageData.filter((v) => v.metrics.riskLevel === "critical").length,
    averageScore: Math.round(villageData.reduce((sum, v) => sum + v.metrics.overallScore, 0) / villageData.length),
    totalPopulation: villageData.reduce((sum, v) => sum + v.population, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Water Health Index System</h2>
          <p className="text-gray-600 mt-2">
            Comprehensive health risk assessment combining water quality, population vulnerability, and healthcare
            access
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-600" />
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {overallStats.criticalRisk} Critical Areas
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Villages</p>
                <p className="text-2xl font-bold">{overallStats.totalVillages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical Risk</p>
                <p className="text-2xl font-bold text-red-600">{overallStats.criticalRisk}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average WHI Score</p>
                <p className="text-2xl font-bold">{overallStats.averageScore}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Population</p>
                <p className="text-2xl font-bold">{overallStats.totalPopulation.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="village-scores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="village-scores">Village Health Scores</TabsTrigger>
          <TabsTrigger value="methodology">WHI Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="village-scores" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Assam">Assam</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Village Cards */}
          <div className="grid gap-6">
            {filteredVillages.map((village) => (
              <Card
                key={village.id}
                className={`border-l-4 border-l-${getRiskColor(village.metrics.riskLevel).replace("bg-", "")}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <CardTitle className="text-xl">{village.name}</CardTitle>
                        <CardDescription>
                          {village.district}, {village.state}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{village.metrics.overallScore}</div>
                        <div className="text-sm text-gray-500">WHI Score</div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Badge className={`${getRiskColor(village.metrics.riskLevel)} text-white`}>
                          {village.metrics.riskLevel.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(village.metrics.trend)}
                          <span className="text-xs text-gray-500">{village.metrics.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Metrics Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Water Health Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              Groundwater Level
                            </span>
                            <span className="text-sm">{village.metrics.groundwaterLevel}/100</span>
                          </div>
                          <Progress value={village.metrics.groundwaterLevel} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              Contamination Risk
                            </span>
                            <span className="text-sm">{village.metrics.contaminationRisk}/100</span>
                          </div>
                          <Progress value={village.metrics.contaminationRisk} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Users className="h-4 w-4 text-purple-500" />
                              Population Vulnerability
                            </span>
                            <span className="text-sm">{village.metrics.populationVulnerability}/100</span>
                          </div>
                          <Progress value={village.metrics.populationVulnerability} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Hospital className="h-4 w-4 text-green-500" />
                              Healthcare Access
                            </span>
                            <span className="text-sm">{village.metrics.healthcareAccess}/100</span>
                          </div>
                          <Progress value={village.metrics.healthcareAccess} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Population & Health Indicators</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="text-gray-500">Total Population</label>
                          <p className="font-medium">{village.population.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Children (0-14)</label>
                          <p className="font-medium">{village.vulnerablePopulation.children}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Pregnant Women</label>
                          <p className="font-medium">{village.vulnerablePopulation.pregnantWomen}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Elderly (65+)</label>
                          <p className="font-medium">{village.vulnerablePopulation.elderly}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-700">Disease Prevalence (per 1000)</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>Water-borne diseases:</span>
                            <span className="font-medium">{village.healthIndicators.waterBorneDiseases}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Malnutrition:</span>
                            <span className="font-medium">{village.healthIndicators.malnutrition}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fluorosis:</span>
                            <span className="font-medium">{village.healthIndicators.fluorosis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Arsenicosis:</span>
                            <span className="font-medium">{village.healthIndicators.arsenicosis}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interventions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Interventions</h4>
                    <div className="flex flex-wrap gap-2">
                      {village.interventions.map((intervention, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {intervention}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {village.metrics.riskLevel === "critical" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Critical Risk Alert:</strong> This village requires immediate intervention. High
                        contamination risk combined with vulnerable population and limited healthcare access.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Water Health Index (WHI) Methodology
              </CardTitle>
              <CardDescription>
                Comprehensive scoring system that evaluates water crisis risk for communities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Scoring Components</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Groundwater Level</span>
                      </div>
                      <Badge variant="outline">25% Weight</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Contamination Risk</span>
                      </div>
                      <Badge variant="outline">35% Weight</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Population Vulnerability</span>
                      </div>
                      <Badge variant="outline">25% Weight</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Hospital className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Healthcare Access</span>
                      </div>
                      <Badge variant="outline">15% Weight</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Risk Level Classification</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Low Risk</span>
                      </div>
                      <span className="text-sm text-gray-600">70-100 WHI Score</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">Medium Risk</span>
                      </div>
                      <span className="text-sm text-gray-600">50-69 WHI Score</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="font-medium">High Risk</span>
                      </div>
                      <span className="text-sm text-gray-600">30-49 WHI Score</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Critical Risk</span>
                      </div>
                      <span className="text-sm text-gray-600">0-29 WHI Score</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Data Sources & Updates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Real-time Data</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• DWLR groundwater levels</li>
                      <li>• Water quality testing</li>
                      <li>• Health facility status</li>
                    </ul>
                  </Card>
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Census Data</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Population demographics</li>
                      <li>• Vulnerable groups</li>
                      <li>• Socioeconomic indicators</li>
                    </ul>
                  </Card>
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Health Records</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Disease surveillance</li>
                      <li>• Malnutrition rates</li>
                      <li>• Healthcare utilization</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
