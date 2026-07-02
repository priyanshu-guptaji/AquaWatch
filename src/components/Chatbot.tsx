import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const botResponses: Record<string, string> = {
  "groundwater level": "Current groundwater levels vary by region. Check the heatmap for specific district data.",
  recharge: "Groundwater recharge depends on rainfall and soil conditions. View the recharge estimation tool for details.",
  alerts: "You can set custom alerts for specific regions. Visit the notifications page to configure them.",
  data: "Our system processes data from 5,260 DWLR stations every 6 hours.",
  sustainability: "Check our Knowledge Hub for best practices in sustainable groundwater management.",
  default:
    "I can help you with groundwater levels, recharge data, alerts, and sustainability practices. What would you like to know?",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "bot" }[]>([
    {
      id: 1,
      text: "Hello! I'm your groundwater monitoring assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = { id: Date.now(), text: inputMessage, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let response = botResponses.default;
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }
      const botMessage = { id: Date.now() + 1, text: response, sender: "bot" as const };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);

    setInputMessage("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-4 w-[90vw] max-w-sm h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg">
            <div className="font-semibold">Groundwater Assistant</div>
            <div className="text-xs opacity-90">Ask me about water levels & sustainability</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] p-2.5 rounded-lg text-sm ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about groundwater..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSendMessage} className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
