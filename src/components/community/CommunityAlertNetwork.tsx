"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { MessageSquare, Phone, Users, Globe, Volume2, Send, Bell, MapPin, Clock } from "lucide-react"

interface CommunityAlert {
  id: string
  title: string
  message: string
  severity: "critical" | "high" | "medium" | "low"
  location: string
  language: string
  channels: ("whatsapp" | "sms" | "voice" | "app")[]
  recipients: number
  sentAt: Date
  status: "sent" | "pending" | "failed"
  acknowledgments: number
}

interface CommunityMember {
  id: string
  name: string
  phone: string
  location: string
  language: string
  role: "farmer" | "health_worker" | "village_head" | "resident"
  subscriptions: string[]
  isLiterate: boolean
}

const languages = [
  { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export default function CommunityAlertNetwork() {
  const [alerts, setAlerts] = useState<CommunityAlert[]>([])
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    severity: "medium" as const,
    location: "",
    language: "hi",
    channels: ["whatsapp", "sms"] as ("whatsapp" | "sms" | "voice" | "app")[],
    targetAudience: "all",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock data initialization
  useEffect(() => {
    const mockAlerts: CommunityAlert[] = [
      {
        id: "1",
        title: "फ्लोराइड का स्तर खतरनाक",
        message: "आपके क्षेत्र में भूजल में फ्लोराइड का स्तर 2.5 mg/L तक पहुंच गया है। तुरंत वैकल्पिक पानी का उपयोग करें।",
        severity: "critical",
        location: "Rajasthan - Jaipur District",
        language: "hi",
        channels: ["whatsapp", "sms", "voice"],
        recipients: 1247,
        sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "sent",
        acknowledgments: 892,
      },
      {
        id: "2",
        title: "আর্সেনিক দূষণের সতর্কতা",
        message: "আপনার এলাকার নলকূপের পানিতে আর্সেনিকের মাত্রা বিপজ্জনক পর্যায়ে পৌঁছেছে। অবিলম্বে বিকল্প পানির ব্যবস্থা করুন।",
        severity: "high",
        location: "West Bengal - Murshidabad",
        language: "bn",
        channels: ["whatsapp", "sms"],
        recipients: 856,
        sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: "sent",
        acknowledgments: 634,
      },
      {
        id: "3",
        title: "Flood Warning - Water Contamination Risk",
        message:
          "Heavy rainfall predicted in next 48 hours. High risk of well contamination. Store clean water and avoid using groundwater.",
        severity: "high",
        location: "Assam - Brahmaputra Valley",
        language: "en",
        channels: ["whatsapp", "sms", "app"],
        recipients: 2134,
        sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        status: "sent",
        acknowledgments: 1567,
      },
    ]

    const mockMembers: CommunityMember[] = [
      {
        id: "1",
        name: "राम कुमार",
        phone: "+91-9876543210",
        location: "Rajasthan - Jaipur",
        language: "hi",
        role: "farmer",
        subscriptions: ["water_quality", "flood_alerts", "health_advisories"],
        isLiterate: false,
      },
      {
        id: "2",
        name: "রহিম উদ্দিন",
        phone: "+91-9876543211",
        location: "West Bengal - Murshidabad",
        language: "bn",
        role: "health_worker",
        subscriptions: ["water_quality", "health_advisories"],
        isLiterate: true,
      },
      {
        id: "3",
        name: "Priya Sharma",
        phone: "+91-9876543212",
        location: "Assam - Guwahati",
        language: "en",
        role: "village_head",
        subscriptions: ["all"],
        isLiterate: true,
      },
    ]

    setAlerts(mockAlerts)
    setMembers(mockMembers)
  }, [])

  const handleSendAlert = async () => {
    setIsLoading(true)

    // Simulate API call to send alerts
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const alert: CommunityAlert = {
      id: Date.now().toString(),
      ...newAlert,
      recipients: members.filter(
        (m) =>
          newAlert.targetAudience === "all" ||
          m.location.includes(newAlert.location) ||
          m.language === newAlert.language,
      ).length,
      sentAt: new Date(),
      status: "sent",
      acknowledgments: 0,
    }

    setAlerts((prev) => [alert, ...prev])
    setNewAlert({
      title: "",
      message: "",
      severity: "medium",
      location: "",
      language: "hi",
      channels: ["whatsapp", "sms"],
      targetAudience: "all",
    })
    setIsLoading(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case "sms":
        return <Phone className="h-4 w-4 text-blue-600" />
      case "voice":
        return <Volume2 className="h-4 w-4 text-purple-600" />
      case "app":
        return <Bell className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const translateMessage = (message: string, targetLanguage: string) => {
    // In production, this would use Google Translate API or similar
    const translations = {
      hi: "आपके क्षेत्र में पानी की गुणवत्ता में समस्या है। कृपया सावधान रहें।",
      bn: "আপনার এলাকায় পানির গুণমানে সমস্যা রয়েছে। অনুগ্রহ করে সতর্ক থাকুন।",
      te: "మీ ప్రాంతంలో నీటి నాణ్యతలో సమస్య ఉంది. దయచేసి జాగ్రత్తగా ఉండండి।",
      ta: "உங்கள் பகுதியில் நீரின் தரத்தில் சிக்கல் உள்ளது. தயவுசெய்து கவனமாக இருங்கள்।",
      en: "There is a water quality issue in your area. Please be cautious.",
    }
    return translations[targetLanguage] || message
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Community Alert Network</h2>
          <p className="text-gray-600 mt-2">Multi-language early warning system for water quality and safety</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {members.length.toLocaleString()} Members
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="send-alert" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send-alert">Send Alert</TabsTrigger>
          <TabsTrigger value="alert-history">Alert History</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="send-alert" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Alert</CardTitle>
              <CardDescription>
                Send multi-language alerts to community members via WhatsApp, SMS, and voice messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alert Title</label>
                  <Input
                    placeholder="Enter alert title"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity Level</label>
                  <Select
                    value={newAlert.severity}
                    onValueChange={(value: any) => setNewAlert((prev) => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Alert Message</label>
                <Textarea
                  placeholder="Enter detailed alert message"
                  value={newAlert.message}
                  onChange={(e) => setNewAlert((prev) => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., Rajasthan - Jaipur District"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Language</label>
                  <Select
                    value={newAlert.language}
                    onValueChange={(value) => setNewAlert((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Delivery Channels</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                    { id: "sms", label: "SMS", icon: Phone },
                    { id: "voice", label: "Voice Call", icon: Volume2 },
                    { id: "app", label: "App Notification", icon: Bell },
                  ].map((channel) => (
                    <div key={channel.id} className="flex items-center space-x-2">
                      <Switch
                        checked={newAlert.channels.includes(channel.id as any)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewAlert((prev) => ({
                              ...prev,
                              channels: [...prev.channels, channel.id as any],
                            }))
                          } else {
                            setNewAlert((prev) => ({
                              ...prev,
                              channels: prev.channels.filter((c) => c !== channel.id),
                            }))
                          }
                        }}
                      />
                      <channel.icon className="h-4 w-4" />
                      <label className="text-sm">{channel.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSendAlert}
                  disabled={isLoading || !newAlert.title || !newAlert.message}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Sending..." : "Send Alert"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alert-history" className="space-y-4">
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 border-l-${getSeverityColor(alert.severity).replace("bg-", "")}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {languages.find((l) => l.code === alert.language)?.flag}{" "}
                        {languages.find((l) => l.code === alert.language)?.name.split(" ")[0]}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {alert.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {alert.sentAt.toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{alert.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{alert.recipients.toLocaleString()} recipients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bell className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{alert.acknowledgments.toLocaleString()} acknowledged</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.channels.map((channel) => (
                        <div key={channel} className="flex items-center gap-1">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{member.role.replace("_", " ")}</Badge>
                      <Badge variant="outline">
                        {languages.find((l) => l.code === member.language)?.flag}{" "}
                        {languages.find((l) => l.code === member.language)?.name.split(" ")[0]}
                      </Badge>
                      {!member.isLiterate && <Badge className="bg-orange-100 text-orange-800">Voice Preferred</Badge>}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{member.location}</span>
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
