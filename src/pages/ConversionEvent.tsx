
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ConversionEvent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { whatsappBusinessId } = useAuth();
  const { ctwaClid, datasetId, addEvent } = useData();
  
  // Get event type from location state or default to Purchase
  const defaultEventType = location.state?.eventType || "Purchase";
  
  const [isSending, setIsSending] = useState(false);
  const [eventName, setEventName] = useState<string>(defaultEventType);
  const [value, setValue] = useState<string>("100.00");
  const [currency, setCurrency] = useState<string>("USD");

  const handleSendEvent = () => {
    if (!eventName) {
      toast({
        title: "Error",
        description: "Please select an event type",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    // Create payload
    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "business_messaging",
      messaging_channel: "whatsapp",
      user_data: {
        whatsapp_business_account_id: whatsappBusinessId || "SAMPLE_WABA_ID",
        ctwa_clid: ctwaClid || "SAMPLE_CTWA_CLID"
      },
      custom_data: {
        currency: currency,
        value: parseFloat(value)
      },
      partner_agent: "SAMPLE_PARTNER_NAME"
    };

    // Simulate sending event
    setTimeout(() => {
      // Add to events list
      addEvent({
        id: Date.now().toString(),
        name: eventName,
        timestamp: Date.now(),
        status: 'success',
        details: payload
      });
      
      setIsSending(false);
      
      toast({
        title: "Conversion Event Sent",
        description: `Your ${eventName} event has been successfully sent to Meta's Conversions API.`,
      });
    }, 1500);
  };

  const handleViewReports = () => {
    navigate("/event-reporting");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">Conversion Event</h1>
        <p className="text-gray-500 mt-2">Send conversion events to Meta's Conversions API</p>
      </div>

      <div className="bg-meta-light p-6 rounded-lg border border-blue-100 space-y-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">Event Configuration</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <Select value={eventName} onValueChange={setEventName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="LeadSubmitted">Lead Submitted</SelectItem>
                    <SelectItem value="AddToCart">Add To Cart</SelectItem>
                    <SelectItem value="InitiateCheckout">Initiate Checkout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="100.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">API Payload Preview</h3>
            <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`fetch('https://your-backend-endpoint/send-conversion-event', {
  method: 'POST',
  body: JSON.stringify({
    event_name: "${eventName}",
    event_time: ${Math.floor(Date.now() / 1000)},
    action_source: "business_messaging",
    messaging_channel: "whatsapp",
    user_data: {
      whatsapp_business_account_id: "${whatsappBusinessId || "<WHATSAPP_BUSINESS_ACCOUNT_ID>"}",
      ctwa_clid: "${ctwaClid || "<CTWA_CLID>"}"
    },
    custom_data: {
      currency: "${currency}",
      value: ${value}
    },
    partner_agent: "<PARTNER_NAME>"
  }),
});`}
            </pre>
          </div>

          <div className="flex gap-3">
            <Button 
              className="w-full md:w-auto bg-meta-blue hover:bg-blue-600"
              onClick={handleSendEvent}
              disabled={isSending}
            >
              {isSending ? "Sending Event..." : "Send Conversion Event"}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full md:w-auto"
              onClick={handleViewReports}
            >
              View Reports
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Using the Conversions API for WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                The Conversions API helps you attribute sales and other conversion events to your WhatsApp 
                marketing. With the WhatsApp parameter and CTWA Click ID, you can track which ads are driving 
                conversations and conversions through WhatsApp.
              </p>
              
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
                <p className="text-sm text-yellow-700">
                  In a production environment, these API calls should be made from your backend server to keep 
                  your access tokens secure. This prototype simulates these calls for demonstration purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConversionEvent;
