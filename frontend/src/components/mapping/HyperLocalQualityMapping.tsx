"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Droplets,
  AlertTriangle,
  TrendingUp,
  Thermometer,
  Eye,
  Target,
  Zap,
  Clock,
} from "lucide-react"

interface WellData {
  id: string
  wellId: string
  location: {
    block: string
    village: string
    coordinates: [number, number]
  }
  depth: number
  contaminants: {
    fluoride: number
    arsenic: number
    nitrate: number
    salinity: number
    iron: number
  }
  safetyLimits: {
    fluoride: 1.5
    arsenic: 0.01
    nitrate: 45
    salinity: 2000
    iron: 0.3
  }
  riskScore: number
  lastTested: Date
  seasonalPattern: {
    month: string
    fluoride: number
    arsenic: number
    riskLevel: "safe" | "caution" | "unsafe"
  }[]
  healthRisk: "low" | "medium" | "high" | "critical"
  affectedPopulation: number
}

interface BlockContamination {
  blockName: string
  district: string
  state: string
  totalWells: number
  contaminatedWells: number
  contaminationTypes: {
    fluoride: number
    arsenic: number
    nitrate: number
    salinity: number
  }
  overallRisk: number
  population: number
  vulnerableGroups: {
    children: number
    pregnantWomen: number
    elderly: number
  }
}

export default function HyperLocalQualityMapping() {
  const [wellData, setWellData] = useState<WellData[]>([])
  const [blockData, setBlockData] = useState<BlockContamination[]>([])
  const [selectedBlock, setSelectedBlock] = useState("all")
  const [selectedContaminant, setSelectedContaminant] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [isLoading, setIsLoading] = useState(true)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Mock data initialization
  useEffect(() => {
    const generateSeasonalPattern = () => {
      return months.map((month, index) => {
        const baseFluroide = 0.8 + Math.sin((index / 12) * 2 * Math.PI) * 0.4 + Math.random() * 0.3
        const baseArsenic = 0.005 + Math.sin(((index + 3) / 12) * 2 * Math.PI) * 0.003 + Math.random() * 0.002

        let riskLevel: "safe" | "caution" | "unsafe" = "safe"
        if (baseFluroide > 1.5 || baseArsenic > 0.01) riskLevel = "unsafe"
        else if (baseFluroide > 1.0 || baseArsenic > 0.007) riskLevel = "caution"

        return {
          month,
          fluoride: Math.round(baseFluroide * 100) / 100,
          arsenic: Math.round(baseArsenic * 1000) / 1000,
          riskLevel,
        }
      })
    }

    const mockWellData: WellData[] = [
      {
        id: "1",
        wellId: "RJ-JAI-001",
        location: {
          block: "Jaipur Rural",
          village: "Khetri",
          coordinates: [26.9124, 75.7873],
        },
        depth: 45.2,
        contaminants: {
          fluoride: 2.8,
          arsenic: 0.003,
          nitrate: 12.5,
          salinity: 850,
          iron: 0.15,
        },
        safetyLimits: {
          fluoride: 1.5,
          arsenic: 0.01,
          nitrate: 45,
          salinity: 2000,
          iron: 0.3,
        },
        riskScore: 92,
        lastTested: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        seasonalPattern: generateSeasonalPattern(),
        healthRisk: "critical",
        affectedPopulation: 2847,
      },
      {
        id: "2",
        wellId: "WB-MUR-045",
        location: {
          block: "Murshidabad",
          village: "Sundarbans",
          coordinates: [24.1833, 88.2833],
        },
        depth: 38.7,
        contaminants: {
          fluoride: 0.8,
          arsenic: 0.085,
          nitrate: 8.2,
          salinity: 450,
          iron: 0.45,
        },
        safetyLimits: {
          fluoride: 1.5,
          arsenic: 0.01,
          nitrate: 45,
          salinity: 2000,
          iron: 0.3,
        },
        riskScore: 95,
        lastTested: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        seasonalPattern: generateSeasonalPattern(),
        healthRisk: "critical",
        affectedPopulation: 1923,
      },
      {
        id: "3",
        wellId: "GJ-KUT-023",
        location: {
          block: "Kutch East",
          village: "Bhuj Rural",
          coordinates: [23.7337, 69.8597],
        },
        depth: 52.1,
        contaminants: {
          fluoride: 1.2,
          arsenic: 0.004,
          nitrate: 18.7,
          salinity: 3200,
          iron: 0.12,
        },
        safetyLimits: {
          fluoride: 1.5,
          arsenic: 0.01,
          nitrate: 45,
          salinity: 2000,
          iron: 0.3,
        },
        riskScore: 78,
        lastTested: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        seasonalPattern: generateSeasonalPattern(),
        healthRisk: "high",
        affectedPopulation: 3456,
      },
      {
        id: "4",
        wellId: "AS-GOL-012",
        location: {
          block: "Golaghat",
          village: "Assam Valley",
          coordinates: [26.5, 93.9],
        },
        depth: 28.3,
        contaminants: {
          fluoride: 0.6,
          arsenic: 0.002,
          nitrate: 5.8,
          salinity: 180,
          iron: 0.08,
        },
        safetyLimits: {
          fluoride: 1.5,
          arsenic: 0.01,
          nitrate: 45,
          salinity: 2000,
          iron: 0.3,
        },
        riskScore: 25,
        lastTested: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        seasonalPattern: generateSeasonalPattern(),
        healthRisk: "low",
        affectedPopulation: 2134,
      },
    ]

    const mockBlockData: BlockContamination[] = [
      {
        blockName: "Jaipur Rural",
        district: "Jaipur",
        state: "Rajasthan",
        totalWells: 156,
        contaminatedWells: 89,
        contaminationTypes: {
          fluoride: 67,
          arsenic: 12,
          nitrate: 23,
          salinity: 34,
        },
        overallRisk: 85,
        population: 45678,
        vulnerableGroups: {
          children: 8934,
          pregnantWomen: 1234,
          elderly: 3456,
        },
      },
      {
        blockName: "Murshidabad",
        district: "Murshidabad",
        state: "West Bengal",
        totalWells: 234,
        contaminatedWells: 178,
        contaminationTypes: {
          fluoride: 23,
          arsenic: 156,
          nitrate: 45,
          salinity: 12,
        },
        overallRisk: 92,
        population: 67890,
        vulnerableGroups: {
          children: 12345,
          pregnantWomen: 1890,
          elderly: 4567,
        },
      },
      {
        blockName: "Kutch East",
        district: "Kutch",
        state: "Gujarat",
        totalWells: 189,
        contaminatedWells: 98,
        contaminationTypes: {
          fluoride: 45,
          arsenic: 8,
          nitrate: 34,
          salinity: 87,
        },
        overallRisk: 72,
        population: 34567,
        vulnerableGroups: {
          children: 6789,
          pregnantWomen: 890,
          elderly: 2345,
        },
      },
      {
        blockName: "Golaghat",
        district: "Golaghat",
        state: "Assam",
        totalWells: 123,
        contaminatedWells: 23,
        contaminationTypes: {
          fluoride: 12,
          arsenic: 5,
          nitrate: 8,
          salinity: 3,
        },
        overallRisk: 28,
        population: 23456,
        vulnerableGroups: {
          children: 4567,
          pregnantWomen: 567,
          elderly: 1234,
        },
      },
    ]

    setWellData(mockWellData)
    setBlockData(mockBlockData)
    setIsLoading(false)
  }, [])

  const getHealthRiskColor = (risk: string) => {
    switch (risk) {
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

  const getSeasonalRiskColor = (risk: string) => {
    switch (risk) {
      case "unsafe":
        return "bg-red-100 text-red-800"
      case "caution":
        return "bg-yellow-100 text-yellow-800"
      case "safe":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getContaminantIcon = (contaminant: string) => {
    switch (contaminant) {
      case "fluoride":
        return <Zap className="h-4 w-4 text-purple-500" />
      case "arsenic":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "nitrate":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "salinity":
        return <Thermometer className="h-4 w-4 text-orange-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredWells = wellData.filter((well) => {
    const matchesBlock = selectedBlock === "all" || well.location.block === selectedBlock
    const matchesContaminant =
      selectedContaminant === "all" ||
      (selectedContaminant === "fluoride" && well.contaminants.fluoride > well.safetyLimits.fluoride) ||
      (selectedContaminant === "arsenic" && well.contaminants.arsenic > well.safetyLimits.arsenic) ||
      (selectedContaminant === "nitrate" && well.contaminants.nitrate > well.safetyLimits.nitrate) ||
      (selectedContaminant === "salinity" && well.contaminants.salinity > well.safetyLimits.salinity)
    return matchesBlock && matchesContaminant
  })

  const totalContaminatedWells = blockData.reduce((sum, block) => sum + block.contaminatedWells, 0)
  const totalWells = blockData.reduce((sum, block) => sum + block.totalWells, 0)
  const averageRisk = Math.round(blockData.reduce((sum, block) => sum + block.overallRisk, 0) / blockData.length)
  const totalAffectedPopulation = blockData.reduce((sum, block) => sum + block.population, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hyper-Local Quality Mapping</h2>
          <p className="text-gray-600 mt-2">
            Block-level contamination mapping with seasonal patterns and well-specific health risk scoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-red-600" />
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {totalContaminatedWells} Contaminated Wells
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Wells</p>
                <p className="text-2xl font-bold">{totalWells.toLocaleString()}</p>
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
                <p className="text-sm text-gray-600">Contaminated</p>
                <p className="text-2xl font-bold text-red-600">{totalContaminatedWells}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Risk Score</p>
                <p className="text-2xl font-bold">{averageRisk}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Affected Population</p>
                <p className="text-2xl font-bold">{(totalAffectedPopulation / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="well-mapping" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="well-mapping">Well-Specific Mapping</TabsTrigger>
          <TabsTrigger value="block-overview">Block-Level Overview</TabsTrigger>
          <TabsTrigger value="seasonal-calendar">Seasonal Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="well-mapping" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                {blockData.map((block) => (
                  <SelectItem key={block.blockName} value={block.blockName}>
                    {block.blockName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedContaminant} onValueChange={setSelectedContaminant}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by contaminant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contaminants</SelectItem>
                <SelectItem value="fluoride">Fluoride</SelectItem>
                <SelectItem value="arsenic">Arsenic</SelectItem>
                <SelectItem value="nitrate">Nitrate</SelectItem>
                <SelectItem value="salinity">Salinity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Well Cards */}
          <div className="grid gap-4">
            {filteredWells.map((well) => (
              <Card
                key={well.id}
                className={`border-l-4 border-l-${getHealthRiskColor(well.healthRisk).replace("bg-", "")}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <CardTitle className="text-lg">Well {well.wellId}</CardTitle>
                        <CardDescription>
                          {well.location.village}, {well.location.block}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getHealthRiskColor(well.healthRisk)} text-white`}>
                        {well.healthRisk.toUpperCase()} RISK
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{well.riskScore}</div>
                        <div className="text-sm text-gray-500">Risk Score</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Contamination Levels</h4>
                      <div className="space-y-3">
                        {Object.entries(well.contaminants).map(([contaminant, level]) => {
                          const safeLimit = well.safetyLimits[contaminant as keyof typeof well.safetyLimits]
                          const percentage = Math.min((level / safeLimit) * 100, 200)
                          const isUnsafe = level > safeLimit

                          return (
                            <div key={contaminant}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium flex items-center gap-2 capitalize">
                                  {getContaminantIcon(contaminant)}
                                  {contaminant}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm ${isUnsafe ? "text-red-600 font-bold" : "text-gray-600"}`}>
                                    {level} {contaminant === "salinity" ? "ppm" : "mg/L"}
                                  </span>
                                  {isUnsafe && <AlertTriangle className="h-4 w-4 text-red-500" />}
                                </div>
                              </div>
                              <Progress
                                value={percentage}
                                className={`h-2 ${isUnsafe ? "bg-red-100" : "bg-green-100"}`}
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                Safe limit: {safeLimit} {contaminant === "salinity" ? "ppm" : "mg/L"}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Well Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="text-gray-500">Well Depth</label>
                          <p className="font-medium">{well.depth}m</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Last Tested</label>
                          <p className="font-medium">{well.lastTested.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Affected Population</label>
                          <p className="font-medium">{well.affectedPopulation.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Coordinates</label>
                          <p className="font-medium text-xs">
                            {well.location.coordinates[0].toFixed(4)}, {well.location.coordinates[1].toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {well.healthRisk === "critical" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Critical Health Risk:</strong> Multiple contaminants exceed safe limits. Immediate
                        alternative water source required for {well.affectedPopulation.toLocaleString()} people.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="block-overview" className="space-y-4">
          <div className="grid gap-4">
            {blockData.map((block) => (
              <Card key={block.blockName}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{block.blockName}</CardTitle>
                      <CardDescription>
                        {block.district}, {block.state}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-600">{block.overallRisk}</div>
                      <div className="text-sm text-gray-500">Risk Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Wells Status</label>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Contaminated:</span>
                          <span className="font-bold text-red-600">{block.contaminatedWells}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total:</span>
                          <span className="font-bold">{block.totalWells}</span>
                        </div>
                        <Progress value={(block.contaminatedWells / block.totalWells) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Population</label>
                      <div className="text-2xl font-bold text-blue-600">{block.population.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total residents</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Vulnerable Groups</label>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Children:</span>
                          <span className="font-medium">{block.vulnerableGroups.children.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pregnant Women:</span>
                          <span className="font-medium">{block.vulnerableGroups.pregnantWomen.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Elderly:</span>
                          <span className="font-medium">{block.vulnerableGroups.elderly.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Contamination Types</label>
                      <div className="space-y-1">
                        {Object.entries(block.contaminationTypes).map(([type, count]) => (
                          <div key={type} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              {getContaminantIcon(type)}
                              <span className="capitalize">{type}:</span>
                            </div>
                            <span className="font-medium">{count} wells</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seasonal-calendar" className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
            >
              <SelectTrigger className="w-64">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Seasonal Contamination Patterns
            </Badge>
          </div>

          <div className="grid gap-6">
            {wellData.map((well) => (
              <Card key={well.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    {well.location.village} - Well {well.wellId}
                  </CardTitle>
                  <CardDescription>Seasonal contamination calendar showing monthly risk patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {well.seasonalPattern.map((pattern, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center ${
                          index === selectedMonth ? "ring-2 ring-blue-500" : ""
                        } ${getSeasonalRiskColor(pattern.riskLevel)}`}
                      >
                        <div className="text-xs font-medium mb-1">{pattern.month.slice(0, 3)}</div>
                        <div className="text-xs">F: {pattern.fluoride}</div>
                        <div className="text-xs">A: {pattern.arsenic}</div>
                        <div className="text-xs font-bold capitalize">{pattern.riskLevel}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Current Month: {months[selectedMonth]}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Fluoride Level:</span>
                          <span className="font-bold">{well.seasonalPattern[selectedMonth].fluoride} mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Arsenic Level:</span>
                          <span className="font-bold">{well.seasonalPattern[selectedMonth].arsenic} mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <Badge className={getSeasonalRiskColor(well.seasonalPattern[selectedMonth].riskLevel)}>
                            {well.seasonalPattern[selectedMonth].riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Risk Trends</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>
                            Unsafe months: {well.seasonalPattern.filter((p) => p.riskLevel === "unsafe").length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>
                            Caution months: {well.seasonalPattern.filter((p) => p.riskLevel === "caution").length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Safe months: {well.seasonalPattern.filter((p) => p.riskLevel === "safe").length}</span>
                        </div>
                      </div>
                    </div>
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
