"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Brain, TrendingUp, MapPin, Calendar, Droplets } from "lucide-react"

interface ContaminationPrediction {
  location: string
  coordinates: [number, number]
  contaminationType: "fluoride" | "arsenic" | "salinity" | "nitrate"
  currentLevel: number
  predictedLevel: number
  riskScore: number
  timeframe: string
  confidence: number
  recommendations: string[]
  historicalTrend: number[]
}

interface FloodRiskPrediction {
  district: string
  floodProbability: number
  contaminationRisk: number
  evacuationRecommended: boolean
  affectedWells: number
  timeline: string
}

export default function ContaminationPredictionEngine() {
  const [predictions, setPredictions] = useState<ContaminationPrediction[]>([])
  const [floodRisks, setFloodRisks] = useState<FloodRiskPrediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("all")

  // AI Model simulation - in production, this would call actual ML APIs
  const generatePredictions = async () => {
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockPredictions: ContaminationPrediction[] = [
      {
        location: "Rajasthan - Jaipur District",
        coordinates: [26.9124, 75.7873],
        contaminationType: "fluoride",
        currentLevel: 1.2,
        predictedLevel: 2.8,
        riskScore: 85,
        timeframe: "3-6 months",
        confidence: 92,
        recommendations: [
          "Install defluoridation plants in affected villages",
          "Provide alternative water sources immediately",
          "Monitor pregnant women and children closely",
        ],
        historicalTrend: [0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.8, 2.2, 2.8],
      },
      {
        location: "West Bengal - Murshidabad",
        coordinates: [24.1833, 88.2833],
        contaminationType: "arsenic",
        currentLevel: 0.08,
        predictedLevel: 0.15,
        riskScore: 78,
        timeframe: "2-4 months",
        confidence: 88,
        recommendations: [
          "Immediate arsenic testing for all wells",
          "Provide arsenic removal filters",
          "Health screening for affected population",
        ],
        historicalTrend: [0.03, 0.04, 0.05, 0.06, 0.08, 0.1, 0.12, 0.14, 0.15],
      },
      {
        location: "Gujarat - Kutch District",
        coordinates: [23.7337, 69.8597],
        contaminationType: "salinity",
        currentLevel: 2500,
        predictedLevel: 4200,
        riskScore: 72,
        timeframe: "4-8 months",
        confidence: 85,
        recommendations: [
          "Implement reverse osmosis systems",
          "Rainwater harvesting initiatives",
          "Crop pattern modification advisory",
        ],
        historicalTrend: [1800, 2000, 2200, 2300, 2500, 2800, 3200, 3800, 4200],
      },
    ]

    const mockFloodRisks: FloodRiskPrediction[] = [
      {
        district: "Assam - Brahmaputra Valley",
        floodProbability: 89,
        contaminationRisk: 76,
        evacuationRecommended: true,
        affectedWells: 1247,
        timeline: "15-20 days",
      },
      {
        district: "Bihar - Patna District",
        floodProbability: 67,
        contaminationRisk: 54,
        evacuationRecommended: false,
        affectedWells: 892,
        timeline: "25-30 days",
      },
    ]

    setPredictions(mockPredictions)
    setFloodRisks(mockFloodRisks)
    setIsLoading(false)
  }

  useEffect(() => {
    generatePredictions()
  }, [selectedState])

  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-red-500"
    if (score >= 60) return "bg-orange-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "Critical"
    if (score >= 60) return "High"
    if (score >= 40) return "Medium"
    return "Low"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Contamination Prediction Engine</h2>
          <p className="text-gray-600 mt-2">
            Machine learning-powered contamination forecasting and flood risk assessment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            AI Powered
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predictions">Contamination Predictions</TabsTrigger>
          <TabsTrigger value="flood-risk">Flood Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span>AI models processing data...</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {predictions.map((prediction, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <CardTitle className="text-lg">{prediction.location}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getRiskColor(prediction.riskScore)} text-white`}>
                          {getRiskLabel(prediction.riskScore)} Risk
                        </Badge>
                        <Badge variant="outline">{prediction.confidence}% Confidence</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      {prediction.contaminationType.charAt(0).toUpperCase() + prediction.contaminationType.slice(1)}{" "}
                      contamination prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Current Level</label>
                        <div className="text-2xl font-bold text-blue-600">
                          {prediction.currentLevel} {prediction.contaminationType === "salinity" ? "ppm" : "mg/L"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Predicted Level</label>
                        <div className="text-2xl font-bold text-red-600">
                          {prediction.predictedLevel} {prediction.contaminationType === "salinity" ? "ppm" : "mg/L"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Timeline</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{prediction.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Risk Score</label>
                      <Progress value={prediction.riskScore} className="h-3" />
                      <div className="text-sm text-gray-500">{prediction.riskScore}/100</div>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>AI Recommendations:</strong>
                        <ul className="mt-2 space-y-1">
                          {prediction.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="flood-risk" className="space-y-4">
          <div className="grid gap-4">
            {floodRisks.map((risk, index) => (
              <Card
                key={index}
                className={`border-l-4 ${risk.evacuationRecommended ? "border-l-red-500" : "border-l-orange-500"}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{risk.district}</CardTitle>
                    <div className="flex items-center gap-2">
                      {risk.evacuationRecommended && (
                        <Badge className="bg-red-500 text-white">Evacuation Recommended</Badge>
                      )}
                      <Badge variant="outline">{risk.timeline}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Flood Probability</label>
                      <div className="space-y-1">
                        <Progress value={risk.floodProbability} className="h-3" />
                        <div className="text-sm font-medium">{risk.floodProbability}%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Contamination Risk</label>
                      <div className="space-y-1">
                        <Progress value={risk.contaminationRisk} className="h-3" />
                        <div className="text-sm font-medium">{risk.contaminationRisk}%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Affected Wells</label>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-lg font-bold">{risk.affectedWells.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {risk.evacuationRecommended && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Immediate Action Required:</strong> High flood probability with significant
                        contamination risk. Coordinate with local authorities for potential evacuation procedures.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button onClick={generatePredictions} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh AI Predictions
        </Button>
      </div>
    </div>
  )
}
