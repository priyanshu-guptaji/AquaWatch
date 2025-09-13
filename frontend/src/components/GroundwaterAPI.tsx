"use client"

import { useState, useEffect } from "react"

export interface StateGroundwaterData {
  stateId: string
  stateName: string
  ghi: number
  status: "safe" | "moderate" | "stressed" | "critical"
  stations: number
  waterLevel: number
  rechargeRate: number
  lastUpdated: string
  alerts: Array<{
    id: string
    type: "critical" | "warning" | "info"
    message: string
    timestamp: string
  }>
}

export interface NationalData {
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

// Mock API service
class GroundwaterAPIService {
  private baseUrl = "/api/groundwater" // This would be your actual API endpoint

  // Simulate real-time data updates
  async fetchNationalData(): Promise<NationalData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      nationalGHI: Math.floor(Math.random() * 40) + 50, // 50-90
      totalStations: 5260 + Math.floor(Math.random() * 100),
      criticalStates: Math.floor(Math.random() * 5) + 1,
      lastUpdated: new Date().toISOString(),
      trends: {
        improving: Math.floor(Math.random() * 6) + 2,
        declining: Math.floor(Math.random() * 5) + 1,
        stable: Math.floor(Math.random() * 4) + 2,
      },
    }
  }

  async fetchStateData(stateId: string): Promise<StateGroundwaterData> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const mockStates: Record<string, Partial<StateGroundwaterData>> = {
      rajasthan: {
        stateName: "Rajasthan",
        ghi: 32,
        status: "critical",
        stations: 847,
        waterLevel: 45.2,
        rechargeRate: 0.8,
      },
      maharashtra: {
        stateName: "Maharashtra",
        ghi: 58,
        status: "stressed",
        stations: 523,
        waterLevel: 62.1,
        rechargeRate: 2.1,
      },
      gujarat: {
        stateName: "Gujarat",
        ghi: 82,
        status: "safe",
        stations: 389,
        waterLevel: 78.5,
        rechargeRate: 3.2,
      },
    }

    const baseData = mockStates[stateId] || {
      stateName: "Unknown State",
      ghi: 50,
      status: "moderate" as const,
      stations: 200,
      waterLevel: 55.0,
      rechargeRate: 1.5,
    }

    return {
      stateId,
      ...baseData,
      lastUpdated: new Date().toISOString(),
      alerts: [
        {
          id: "1",
          type: baseData.status === "critical" ? "critical" : "info",
          message: `Current groundwater level: ${baseData.waterLevel}m`,
          timestamp: new Date().toISOString(),
        },
      ],
    } as StateGroundwaterData
  }

  async fetchHistoricalData(stateId: string, period: "1M" | "3M" | "6M" | "1Y") {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const months = period === "1M" ? 1 : period === "3M" ? 3 : period === "6M" ? 6 : 12
    const data = []

    for (let i = months; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)

      data.push({
        date: date.toISOString().split("T")[0],
        waterLevel: 50 + Math.random() * 30,
        rechargeRate: Math.random() * 4,
        ghi: 40 + Math.random() * 40,
      })
    }

    return data
  }
}

export const groundwaterAPI = new GroundwaterAPIService()

// Custom hook for groundwater data
export const useGroundwaterData = () => {
  const [nationalData, setNationalData] = useState<NationalData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNationalData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await groundwaterAPI.fetchNationalData()
      setNationalData(data)
    } catch (err) {
      setError("Failed to fetch national groundwater data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNationalData()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNationalData, 30000)
    return () => clearInterval(interval)
  }, [])

  return {
    nationalData,
    loading,
    error,
    refetch: fetchNationalData,
  }
}

export const useStateGroundwaterData = (stateId: string | null) => {
  const [stateData, setStateData] = useState<StateGroundwaterData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!stateId) {
      setStateData(null)
      return
    }

    const fetchStateData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await groundwaterAPI.fetchStateData(stateId.toLowerCase())
        setStateData(data)
      } catch (err) {
        setError(`Failed to fetch data for ${stateId}`)
      } finally {
        setLoading(false)
      }
    }

    fetchStateData()
  }, [stateId])

  return {
    stateData,
    loading,
    error,
  }
}
