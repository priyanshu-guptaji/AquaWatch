"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Droplets, AlertTriangle, Loader2, RefreshCw } from "lucide-react"

// Comprehensive state data with real coordinates and detailed information
const stateData = [
  {
    name: "Rajasthan",
    status: "critical",
    stations: 847,
    ghi: 32,
    coordinates: "M 150,200 L 250,180 L 280,220 L 270,280 L 200,300 L 150,260 Z",
    capital: "Jaipur",
    population: "68.5M",
    area: "342,239 km²",
  },
  {
    name: "Maharashtra",
    status: "stressed",
    stations: 523,
    ghi: 58,
    coordinates: "M 200,300 L 270,280 L 300,320 L 280,380 L 220,400 L 180,360 Z",
    capital: "Mumbai",
    population: "112.4M",
    area: "307,713 km²",
  },
  {
    name: "Uttar Pradesh",
    status: "moderate",
    stations: 612,
    ghi: 67,
    coordinates: "M 280,220 L 380,200 L 420,240 L 400,280 L 320,300 L 280,260 Z",
    capital: "Lucknow",
    population: "199.8M",
    area: "240,928 km²",
  },
  {
    name: "Gujarat",
    status: "safe",
    stations: 389,
    ghi: 82,
    coordinates: "M 150,260 L 200,300 L 180,360 L 120,380 L 100,320 L 120,280 Z",
    capital: "Gandhinagar",
    population: "60.4M",
    area: "196,244 km²",
  },
  {
    name: "Karnataka",
    status: "moderate",
    stations: 445,
    ghi: 71,
    coordinates: "M 220,400 L 280,380 L 300,420 L 280,480 L 220,500 L 180,460 Z",
    capital: "Bengaluru",
    population: "61.1M",
    area: "191,791 km²",
  },
  {
    name: "Tamil Nadu",
    status: "stressed",
    stations: 298,
    ghi: 54,
    coordinates: "M 280,480 L 320,460 L 340,520 L 300,560 L 260,540 L 240,500 Z",
    capital: "Chennai",
    population: "72.1M",
    area: "130,060 km²",
  },
  {
    name: "Andhra Pradesh",
    status: "safe",
    stations: 367,
    ghi: 78,
    coordinates: "M 300,420 L 360,400 L 380,460 L 340,520 L 300,500 L 280,460 Z",
    capital: "Amaravati",
    population: "49.4M",
    area: "162,968 km²",
  },
  {
    name: "Madhya Pradesh",
    status: "moderate",
    stations: 456,
    ghi: 69,
    coordinates: "M 250,280 L 320,260 L 350,300 L 320,340 L 270,360 L 220,340 Z",
    capital: "Bhopal",
    population: "72.6M",
    area: "308,245 km²",
  },
  {
    name: "West Bengal",
    status: "moderate",
    stations: 234,
    ghi: 73,
    coordinates: "M 420,240 L 480,220 L 500,280 L 460,320 L 420,300 L 400,260 Z",
    capital: "Kolkata",
    population: "91.3M",
    area: "88,752 km²",
  },
  {
    name: "Kerala",
    status: "safe",
    stations: 189,
    ghi: 85,
    coordinates: "M 240,500 L 260,540 L 240,580 L 200,600 L 180,560 L 200,520 Z",
    capital: "Thiruvananthapuram",
    population: "33.4M",
    area: "38,852 km²",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "safe":
      return "#22c55e"
    case "moderate":
      return "#eab308"
    case "stressed":
      return "#f97316"
    case "critical":
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "safe":
      return "bg-green-500"
    case "moderate":
      return "bg-yellow-500"
    case "stressed":
      return "bg-orange-500"
    case "critical":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

interface GroundwaterData {
  nationalGHI: number
  totalStations: number
  criticalStates: number
  lastUpdated: string
  trends: {
    improving: number
    declining: number
    stable: number
  }
}

export const IndiaMapSVG = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [groundwaterData, setGroundwaterData] = useState<GroundwaterData>({
    nationalGHI: 64,
    totalStations: 5260,
    criticalStates: 3,
    lastUpdated: new Date().toLocaleString(),
    trends: { improving: 4, declining: 3, stable: 3 },
  })

  // Simulate real-time data updates
  const refreshData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setGroundwaterData((prev) => ({
      ...prev,
      nationalGHI: Math.max(30, Math.min(90, prev.nationalGHI + (Math.random() - 0.5) * 4)),
      lastUpdated: new Date().toLocaleString(),
      trends: {
        improving: Math.floor(Math.random() * 6) + 2,
        declining: Math.floor(Math.random() * 5) + 1,
        stable: Math.floor(Math.random() * 4) + 2,
      },
    }))
    setLoading(false)
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [])

  const selectedStateData = selectedState ? stateData.find((s) => s.name === selectedState) : null

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-2">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            National Groundwater Status - Live Map
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button
              onClick={refreshData}
              disabled={loading}
              size="sm"
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live Data</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated: {groundwaterData.lastUpdated} | {groundwaterData.totalStations} DWLR Stations Active
        </p>
      </CardHeader>

      <CardContent className="p-6">
        {/* National Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border">
            <div className="text-3xl font-bold text-blue-600">{Math.round(groundwaterData.nationalGHI)}</div>
            <div className="text-sm text-muted-foreground">National GHI</div>
            <div className="text-xs text-blue-600 mt-1">Average Score</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border">
            <div className="text-3xl font-bold text-green-600">{groundwaterData.totalStations.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Stations</div>
            <div className="text-xs text-green-600 mt-1">DWLR Network</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border">
            <div className="text-3xl font-bold text-red-600">{groundwaterData.criticalStates}</div>
            <div className="text-sm text-muted-foreground">Critical States</div>
            <div className="text-xs text-red-600 mt-1">Need Attention</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border">
            <div className="text-3xl font-bold text-purple-600">{groundwaterData.trends.improving}</div>
            <div className="text-sm text-muted-foreground">Improving</div>
            <div className="text-xs text-purple-600 mt-1">Trend Analysis</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive SVG Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-xl p-4 border-2 border-dashed border-blue-200 dark:border-blue-800">
              <svg
                viewBox="0 0 600 700"
                className="w-full h-auto max-h-[500px]"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
              >
                {/* Background */}
                <rect width="600" height="700" fill="transparent" />

                {/* State paths */}
                {stateData.map((state) => (
                  <g key={state.name}>
                    <path
                      d={state.coordinates}
                      fill={getStatusColor(state.status)}
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity={hoveredState === state.name ? 0.9 : 0.7}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      style={{
                        filter:
                          selectedState === state.name
                            ? "drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))"
                            : hoveredState === state.name
                              ? "drop-shadow(0 0 6px rgba(0,0,0,0.3))"
                              : "none",
                        transform: hoveredState === state.name ? "scale(1.02)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                      onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseLeave={() => setHoveredState(null)}
                    />

                    {/* State labels */}
                    <text
                      x={
                        state.coordinates.includes("150,200")
                          ? 200
                          : state.coordinates.includes("200,300")
                            ? 235
                            : state.coordinates.includes("280,220")
                              ? 350
                              : state.coordinates.includes("150,260")
                                ? 140
                                : state.coordinates.includes("220,400")
                                  ? 250
                                  : state.coordinates.includes("280,480")
                                    ? 300
                                    : state.coordinates.includes("300,420")
                                      ? 340
                                      : state.coordinates.includes("250,280")
                                        ? 285
                                        : state.coordinates.includes("420,240")
                                          ? 450
                                          : 220
                      }
                      y={
                        state.coordinates.includes("150,200")
                          ? 240
                          : state.coordinates.includes("200,300")
                            ? 340
                            : state.coordinates.includes("280,220")
                              ? 240
                              : state.coordinates.includes("150,260")
                                ? 320
                                : state.coordinates.includes("220,400")
                                  ? 450
                                  : state.coordinates.includes("280,480")
                                    ? 520
                                    : state.coordinates.includes("300,420")
                                      ? 460
                                      : state.coordinates.includes("250,280")
                                        ? 320
                                        : state.coordinates.includes("420,240")
                                          ? 280
                                          : 540
                      }
                      textAnchor="middle"
                      className="text-xs font-semibold fill-white pointer-events-none"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                        fontSize: hoveredState === state.name ? "14px" : "12px",
                      }}
                    >
                      {state.name.length > 12 ? state.name.substring(0, 10) + "..." : state.name}
                    </text>

                    {/* GHI Score indicator */}
                    <circle
                      cx={
                        state.coordinates.includes("150,200")
                          ? 220
                          : state.coordinates.includes("200,300")
                            ? 255
                            : state.coordinates.includes("280,220")
                              ? 370
                              : state.coordinates.includes("150,260")
                                ? 160
                                : state.coordinates.includes("220,400")
                                  ? 270
                                  : state.coordinates.includes("280,480")
                                    ? 320
                                    : state.coordinates.includes("300,420")
                                      ? 360
                                      : state.coordinates.includes("250,280")
                                        ? 305
                                        : state.coordinates.includes("420,240")
                                          ? 470
                                          : 240
                      }
                      cy={
                        state.coordinates.includes("150,200")
                          ? 220
                          : state.coordinates.includes("200,300")
                            ? 320
                            : state.coordinates.includes("280,220")
                              ? 220
                              : state.coordinates.includes("150,260")
                                ? 300
                                : state.coordinates.includes("220,400")
                                  ? 430
                                  : state.coordinates.includes("280,480")
                                    ? 500
                                    : state.coordinates.includes("300,420")
                                      ? 440
                                      : state.coordinates.includes("250,280")
                                        ? 300
                                        : state.coordinates.includes("420,240")
                                          ? 260
                                          : 520
                      }
                      r="12"
                      fill="white"
                      stroke={getStatusColor(state.status)}
                      strokeWidth="2"
                      className="pointer-events-none"
                    />
                    <text
                      x={
                        state.coordinates.includes("150,200")
                          ? 220
                          : state.coordinates.includes("200,300")
                            ? 255
                            : state.coordinates.includes("280,220")
                              ? 370
                              : state.coordinates.includes("150,260")
                                ? 160
                                : state.coordinates.includes("220,400")
                                  ? 270
                                  : state.coordinates.includes("280,480")
                                    ? 320
                                    : state.coordinates.includes("300,420")
                                      ? 360
                                      : state.coordinates.includes("250,280")
                                        ? 305
                                        : state.coordinates.includes("420,240")
                                          ? 470
                                          : 240
                      }
                      y={
                        state.coordinates.includes("150,200")
                          ? 225
                          : state.coordinates.includes("200,300")
                            ? 325
                            : state.coordinates.includes("280,220")
                              ? 225
                              : state.coordinates.includes("150,260")
                                ? 305
                                : state.coordinates.includes("220,400")
                                  ? 435
                                  : state.coordinates.includes("280,480")
                                    ? 505
                                    : state.coordinates.includes("300,420")
                                      ? 445
                                      : state.coordinates.includes("250,280")
                                        ? 305
                                        : state.coordinates.includes("420,240")
                                          ? 265
                                          : 525
                      }
                      textAnchor="middle"
                      className="text-xs font-bold pointer-events-none"
                      fill={getStatusColor(state.status)}
                    >
                      {state.ghi}
                    </text>
                  </g>
                ))}

                {/* Legend */}
                <g transform="translate(20, 600)">
                  <rect
                    x="0"
                    y="0"
                    width="200"
                    height="80"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="8"
                    opacity="0.95"
                  />
                  <text x="10" y="20" className="text-sm font-semibold" fill="#374151">
                    Water Level Status
                  </text>

                  <circle cx="20" cy="35" r="6" fill="#22c55e" />
                  <text x="35" y="40" className="text-xs" fill="#374151">
                    Safe (≥80)
                  </text>

                  <circle cx="20" cy="50" r="6" fill="#eab308" />
                  <text x="35" y="55" className="text-xs" fill="#374151">
                    Moderate (60-79)
                  </text>

                  <circle cx="110" cy="35" r="6" fill="#f97316" />
                  <text x="125" y="40" className="text-xs" fill="#374151">
                    Stressed (40-59)
                  </text>

                  <circle cx="110" cy="50" r="6" fill="#ef4444" />
                  <text x="125" y="55" className="text-xs" fill="#374151">
                    Critical (&lt;40)
                  </text>
                </g>
              </svg>

              {hoveredState && (
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border z-10">
                  <div className="text-sm font-semibold">{hoveredState}</div>
                  <div className="text-xs text-muted-foreground">Click to view details</div>
                </div>
              )}
            </div>
          </div>

          {/* State Details Panel */}
          <div className="space-y-4">
            {selectedStateData ? (
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedStateData.name}</CardTitle>
                    <Badge className={`${getStatusBgColor(selectedStateData.status)} text-white`}>
                      {selectedStateData.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedStateData.ghi}</div>
                      <div className="text-xs text-muted-foreground">GHI Score</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedStateData.stations}</div>
                      <div className="text-xs text-muted-foreground">DWLR Stations</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital:</span>
                      <span className="font-medium">{selectedStateData.capital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Population:</span>
                      <span className="font-medium">{selectedStateData.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="font-medium">{selectedStateData.area}</span>
                    </div>
                  </div>

                  {selectedStateData.status === "critical" && (
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Critical Alert</span>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Immediate intervention required for groundwater management.
                      </p>
                    </div>
                  )}

                  <Button className="w-full" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Click on any state to view detailed groundwater information</p>
                </CardContent>
              </Card>
            )}

            {/* Trend Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Improving</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {groundwaterData.trends.improving} states
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Declining</span>
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    {groundwaterData.trends.declining} states
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stable</span>
                  <Badge variant="outline" className="text-gray-600 border-gray-600">
                    {groundwaterData.trends.stable} states
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
