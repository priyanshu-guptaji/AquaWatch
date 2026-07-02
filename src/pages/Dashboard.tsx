"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { states, districts, blocks, alerts } from "@/data/mock"
import { WaterLevelChart } from "@/components/WaterLevelChart"
import { RechargeEstimator } from "@/components/RechargeEstimator"
import { GroundwaterHealthIndex } from "@/components/GroundwaterHealthIndex"
import { AdvancedDashboardGrid } from "@/components/advanced/AdvancedWidgets"
import { IndiaMapSVG } from "@/components/IndiaMapSVG"
import { useGroundwaterData, useStateGroundwaterData } from "@/components/GroundwaterAPI"
import { GroundwaterWidget } from "@/components/groundwater"
import ClickableIndiaMap from "@/components/ClickableIndiaMap"
import { MapPin, Activity, TrendingUp, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const [state, setState] = useState(states[0])
  const [district, setDistrict] = useState(districts[0])
  const [block, setBlock] = useState(blocks[0])
  const [selectedMapState, setSelectedMapState] = useState<string | null>(null)

  const { nationalData, loading: nationalLoading, refetch } = useGroundwaterData()
  const { stateData, loading: stateLoading } = useStateGroundwaterData(selectedMapState)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Groundwater Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time monitoring and analysis of India's groundwater resources</p>
        </div>
        <div className="flex items-center gap-3">
          {nationalData && (
            <Badge className="bg-green-500 text-white flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Live Data
            </Badge>
          )}
          <Button onClick={refetch} disabled={nationalLoading} size="sm">
            Refresh Data
          </Button>
        </div>
      </div>

      {nationalData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{nationalData.nationalGHI}</div>
              <div className="text-sm text-muted-foreground">National GHI</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{nationalData.totalStations.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Stations</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{nationalData.criticalStates}</div>
              <div className="text-sm text-muted-foreground">Critical States</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{nationalData.trends.improving}</div>
              <div className="text-sm text-muted-foreground">Improving</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={state} onValueChange={setState}>
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={block} onValueChange={setBlock}>
            <SelectTrigger>
              <SelectValue placeholder="Block" />
            </SelectTrigger>
            <SelectContent>
              {blocks.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <ClickableIndiaMap />
        </div>

        <div className="space-y-4">
          {stateData ? (
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {stateData.stateName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{stateData.ghi}</div>
                    <div className="text-xs text-muted-foreground">GHI Score</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{stateData.stations}</div>
                    <div className="text-xs text-muted-foreground">Stations</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Water Level:</span>
                    <span className="font-medium">{stateData.waterLevel}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recharge Rate:</span>
                    <span className="font-medium">{stateData.rechargeRate} mm/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      className={`
                      ${
                        stateData.status === "safe"
                          ? "bg-green-500"
                          : stateData.status === "moderate"
                            ? "bg-yellow-500"
                            : stateData.status === "stressed"
                              ? "bg-orange-500"
                              : "bg-red-500"
                      } 
                      text-white
                    `}
                    >
                      {stateData.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {stateData.alerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Recent Alerts
                    </h4>
                    {stateData.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-2 rounded text-xs ${
                          alert.type === "critical"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : alert.type === "warning"
                              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {alert.message}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click on a state in the map to view detailed information
                </p>
              </CardContent>
            </Card>
          )}

          {/* Trend indicators */}
          {nationalData && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  National Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Improving</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {nationalData.trends.improving}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Declining</span>
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    {nationalData.trends.declining}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stable</span>
                  <Badge variant="outline" className="text-gray-600 border-gray-600">
                    {nationalData.trends.stable}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WaterLevelChart />
          <RechargeEstimator />
        </div>
        <div className="space-y-6">
          <GroundwaterHealthIndex score={64} region={`${state} / ${district}`} trend="up" />
          <GroundwaterWidget 
            onViewFull={() => window.location.href = '/groundwater'}
          />
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded border ${a.severity === "critical" ? "bg-water-critical/10 border-water-critical" : a.severity === "warning" ? "bg-water-caution/10 border-water-caution" : "bg-accent/10 border-accent"}`}
                >
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.region} • {a.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced interactive widgets */}
      <AdvancedDashboardGrid />
    </div>
  )
}
