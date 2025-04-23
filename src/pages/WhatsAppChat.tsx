
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WhatsAppChat = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to our WhatsApp Business chat. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thank you for your message! How else can I help you?",
        "Would you like to learn more about our products?",
        "Is there anything specific you're looking for today?",
        "I'd be happy to assist you with any questions you might have."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleActionButtonClick = (action: string) => {
    // Simulate lead or purchase action
    const actionMessage: Message = {
      id: Date.now().toString(),
      text: `[${action}] - User triggered a ${action.toLowerCase()} action.`,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, actionMessage]);
    
    // Redirect to appropriate page based on action
    if (action === "Lead Submitted" || action === "Purchase") {
      setTimeout(() => {
        navigate("/conversion-event", { 
          state: { eventType: action === "Lead Submitted" ? "LeadSubmitted" : "Purchase" }
        });
      }, 1000);
    }
  };

  const handleStartCtwaClick = () => {
    navigate("/capture-ctwa");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-4">Please login to access the WhatsApp chat interface.</p>
        <Button onClick={() => navigate("/onboarding")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">WhatsApp Chat Interface</h1>
        <p className="text-gray-500 mt-2">Simulate WhatsApp conversations and trigger conversion events</p>
      </div>

      <div className="flex flex-col h-[600px] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
        {/* Chat header */}
        <div className="bg-whatsapp-green text-white p-3 flex items-center">
          <Avatar className="h-10 w-10 border-2 border-white">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center text-black font-medium">
              WB
            </div>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium">WhatsApp Business</p>
            <p className="text-xs opacity-80">Online</p>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-whatsapp-light text-gray-800"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-500 text-right mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Action buttons */}
        <div className="bg-white p-3 border-t border-gray-200">
          <div className="flex gap-2 mb-3 flex-wrap">
            <Button 
              variant="outline" 
              className="text-xs bg-blue-50"
              onClick={() => handleActionButtonClick("Lead Submitted")}
            >
              Submit Lead
            </Button>
            <Button 
              variant="outline" 
              className="text-xs bg-green-50"
              onClick={() => handleActionButtonClick("Purchase")}
            >
              Complete Purchase
            </Button>
            <Button 
              variant="outline" 
              className="text-xs bg-purple-50"
              onClick={handleStartCtwaClick}
            >
              Simulate CTWA Click
            </Button>
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" className="bg-whatsapp-green hover:bg-green-500">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;
