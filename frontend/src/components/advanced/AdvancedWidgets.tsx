import React, { useState } from "react";
import { Award, Brain, Camera, Droplets, Eye, Globe, MapPin, Mic, Satellite as SatelliteIcon, Send, Smartphone, X, MessageCircle, Play, Pause, Zap, Users, AlertTriangle, Bell } from "lucide-react";

export const ThreeDVisualization = () => {
  const [isRotating, setIsRotating] = useState(true);
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 p-6 rounded-xl shadow-2xl text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s` }}
          />
        ))}
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Brain className="mr-2 h-6 w-6" />
          AI-Powered 3D Aquifer Visualization
        </h3>
        <div className="h-64 flex items-center justify-center relative">
          <div className={`w-32 h-32 relative ${isRotating ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }}>
            <div className="absolute inset-0 border-4 border-blue-300 rounded-full opacity-60" />
            <div className="absolute inset-2 border-4 border-blue-200 rounded-full opacity-70" />
            <div className="absolute inset-4 border-4 border-blue-100 rounded-full opacity-80" />
            <div className="absolute inset-6 border-4 border-white rounded-full opacity-90" />
          </div>
          <button onClick={() => setIsRotating(!isRotating)} className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
            {isRotating ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div className="text-center"><div className="w-4 h-4 bg-blue-300 rounded-full mx-auto mb-1" /><p>Surface Layer</p></div>
          <div className="text-center"><div className="w-4 h-4 bg-blue-200 rounded-full mx-auto mb-1" /><p>Vadose Zone</p></div>
          <div className="text-center"><div className="w-4 h-4 bg-white rounded-full mx-auto mb-1" /><p>Saturated Zone</p></div>
        </div>
      </div>
    </div>
  );
};

export const ARCameraIntegration = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [lastScan, setLastScan] = useState<{ location: string; waterLevel: string; quality: string; recommendation: string } | null>(null);
  const handleCameraScan = () => {
    setIsCameraActive(true);
    setTimeout(() => {
      setLastScan({ location: "Detected: Punjab, Ludhiana District", waterLevel: "12.4m depth", quality: "Good", recommendation: "Safe for irrigation" });
      setIsCameraActive(false);
    }, 3000);
  };
  return (
    <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-6 rounded-xl shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4 flex items-center"><Camera className="mr-2 h-6 w-6" />AR Well Scanner 📱</h3>
      <div className="space-y-4">
        {!isCameraActive && !lastScan && (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"><Camera size={48} className="opacity-60" /></div>
            <p className="text-sm mb-4">Point camera at any borewell or water source for instant analysis</p>
            <button onClick={handleCameraScan} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full font-semibold transition-colors backdrop-blur-sm">Start AR Scan</button>
          </div>
        )}
        {isCameraActive && (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 animate-pulse backdrop-blur-sm"><Eye size={48} className="animate-bounce" /></div>
            <p className="text-sm">🔍 Scanning environment...</p>
            <p className="text-xs opacity-80">Using AI + Satellite Data</p>
          </div>
        )}
        {lastScan && (
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-2">📍 Scan Results</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Location:</strong> {lastScan.location}</p>
              <p><strong>Water Level:</strong> {lastScan.waterLevel}</p>
              <p><strong>Quality:</strong> {lastScan.quality}</p>
              <p><strong>Advice:</strong> {lastScan.recommendation}</p>
            </div>
            <button onClick={() => setLastScan(null)} className="mt-3 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-xs transition-colors">Scan Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SatelliteIntegration = () => {
  const [satelliteData] = useState({ lastUpdate: "2 minutes ago", cloudsDetected: 23, rainfallPrediction: 15, soilMoisture: 68 });
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 p-6 rounded-xl shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4 flex items-center"><SatelliteIcon className="mr-2 h-6 w-6" />Live Satellite Feed 🛰️</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"><p className="text-xs opacity-80">Cloud Cover</p><p className="text-lg font-bold">{satelliteData.cloudsDetected}%</p></div>
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"><p className="text-xs opacity-80">Rain Forecast</p><p className="text-lg font-bold">{satelliteData.rainfallPrediction}mm</p></div>
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"><p className="text-xs opacity-80">Soil Moisture</p><p className="text-lg font-bold">{satelliteData.soilMoisture}%</p></div>
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"><p className="text-xs opacity-80">Last Update</p><p className="text-sm font-semibold">{satelliteData.lastUpdate}</p></div>
      </div>
      <div className="mt-4 flex items-center justify-center"><div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" /><span className="text-xs">Live satellite connection active</span></div>
    </div>
  );
};

export const IoTSensorDashboard = () => {
  const [sensors] = useState([
    { id: "DW001", location: "Punjab-North", status: "active", battery: 87, signal: 95 },
    { id: "DW002", location: "Haryana-East", status: "active", battery: 92, signal: 88 },
    { id: "DW003", location: "UP-Central", status: "maintenance", battery: 45, signal: 76 },
    { id: "DW004", location: "Rajasthan-West", status: "active", battery: 78, signal: 91 },
  ]);
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 flex items-center"><Smartphone className="mr-2 h-5 w-5 text-blue-600" />IoT Sensor Network Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{sensor.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${sensor.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{sensor.status}</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{sensor.location}</p>
            <div className="flex justify-between text-xs"><span>Battery: {sensor.battery}%</span><span>Signal: {sensor.signal}%</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "bot" | "user" }[]>([
    { id: 1, text: "Namaste! 🙏 I'm Jal Mitra, your AI groundwater assistant. I can help in Hindi, Tamil, Telugu, Bengali, and English!", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const languages: Record<string, string> = { en: "English", hi: "हिंदी", ta: "தமிழ்", te: "తెలుగు", bn: "বাংলা" };
  const smartResponses: Record<string, string> = {
    "water level": "I can show you real-time water levels from 5,260+ DWLR stations. Which district interests you?",
    recharge: "Groundwater recharge varies by season. Monsoon contributes 60-80% of annual recharge. Check our recharge calculator!",
    agriculture: "For sustainable farming, try drip irrigation and crop rotation. I can suggest water-efficient crops for your region.",
    "bore well": "Before drilling, check local water table data. I recommend depths between 100-200 feet based on your location.",
    crisis: "Water crisis prevention requires community action. Join our local water conservation groups!",
    pollution: "Groundwater contamination is serious. Report pollution sources through our community portal.",
    government: "Latest government schemes include Jal Jeevan Mission and Atal Bhujal Yojana. Want details?",
    technology: "We use IoT sensors, satellite data, and AI for predictions. Technology makes water management smarter!",
    default: "I understand! Ask me about water levels, farming advice, government schemes, or technology. I learn from every conversation! 🌊",
  };
  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => { setInputMessage("What's the water level in Punjab?"); setIsListening(false); }, 2000);
  };
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = { id: Date.now(), text: inputMessage, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => {
      const lower = inputMessage.toLowerCase();
      let response = smartResponses.default;
      for (const [k, v] of Object.entries(smartResponses)) { if (lower.includes(k)) { response = v; break; } }
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
    }, 800);
    setInputMessage("");
  };
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
          <button onClick={() => setIsOpen(!isOpen)} className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110">
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div><h3 className="font-bold">Jal Mitra AI 🤖</h3><p className="text-sm opacity-90">Smart Water Assistant</p></div>
              <div className="flex items-center space-x-2">
                <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} className="bg-white/20 text-white text-xs rounded px-2 py-1">
                  {Object.entries(languages).map(([code, name]) => (<option key={code} value={code} className="text-black">{name}</option>))}
                </select>
                <Globe size={16} />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs p-3 rounded-xl text-sm shadow-md ${m.sender === "user" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2 items-center">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Ask Jal Mitra anything..." className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={handleVoiceInput} className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-200 hover:bg-gray-300"}`}><Mic size={16} /></button>
              <button onClick={handleSendMessage} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-shadow"><Send size={16} /></button>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2"><span>Powered by AI & ML</span><span>{isListening ? "🎤 Listening..." : "💬 Type or speak"}</span></div>
          </div>
        </div>
      )}
    </>
  );
}

export function AdvancedDashboardGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg text-white"><div className="flex items-center justify-between"><div><p className="text-sm opacity-90">Water Table Depth</p><p className="text-2xl font-bold">12.5m</p></div><Droplets className="h-8 w-8 opacity-80" /></div></div>
        <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-xl shadow-lg text-white"><div className="flex items-center justify-between"><div><p className="text-sm opacity-90">Critical Areas</p><p className="text-2xl font-bold">23%</p></div><AlertTriangle className="h-8 w-8 opacity-80" /></div></div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl shadow-lg text-white"><div className="flex items-center justify-between"><div><p className="text-sm opacity-90">Recharge Rate</p><p className="text-2xl font-bold">15.2%</p></div><Zap className="h-8 w-8 opacity-80" /></div></div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl shadow-lg text-white"><div className="flex items-center justify-between"><div><p className="text-sm opacity-90">Active Sensors</p><p className="text-2xl font-bold">5260</p></div><Users className="h-8 w-8 opacity-80" /></div></div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-6 rounded-xl shadow-lg text-white"><div className="flex items-center justify-between"><div><p className="text-sm opacity-90">Online Users</p><p className="text-2xl font-bold">12847</p></div><Bell className="h-8 w-8 opacity-80" /></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><ThreeDVisualization /><GamificationPanel /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><ARCameraIntegration /><SatelliteIntegration /></div>
      <IoTSensorDashboard />
    </div>
  );
}

export const GamificationPanel = () => {
  const [userScore] = useState(2840);
  const [level] = useState(7);
  const badges = ["Water Saver", "Data Explorer", "Community Hero"];
  const leaderboard = [
    { rank: 1, name: "Punjab Farmers Group", score: 15420, avatar: "🚜" },
    { rank: 2, name: "Maharashtra Industries", score: 12380, avatar: "🏭" },
    { rank: 3, name: "Tamil Nadu Collective", score: 11290, avatar: "🌾" },
  ];
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-6 rounded-xl shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4 flex items-center"><Award className="mr-2 h-6 w-6" />Water Conservation Champions</h3>
      <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2"><span className="text-sm">Level {level} Water Guardian</span><span className="text-sm">{userScore} points</span></div>
        <div className="w-full bg-white/20 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: "73%" }} /></div>
        <p className="text-xs mt-1">730 points to next level!</p>
      </div>
      <div className="flex space-x-2 mb-4">
        {badges.map((b) => (<div key={b} className="bg-white/20 px-2 py-1 rounded-full text-xs backdrop-blur-sm">🏆 {b}</div>))}
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-sm">Top Contributors</h4>
        {leaderboard.map((e) => (
          <div key={e.name} className="flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-sm"><div className="flex items-center space-x-2"><span className="text-lg">{e.avatar}</span><span className="text-sm">{e.name}</span></div><span className="text-xs font-bold">{e.score.toLocaleString()}</span></div>
        ))}
      </div>
    </div>
  );
};
