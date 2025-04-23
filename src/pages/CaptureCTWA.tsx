
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";

const CaptureCTWA = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setCtwaClid } = useData();
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedClid, setCapturedClid] = useState<string | null>(null);

  const generateMockCtwaClid = () => {
    // Format similar to the example: "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a"
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = "ARA";
    
    for (let i = 0; i < 70; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
  };

  const handleCapture = () => {
    setIsCapturing(true);
    
    // Simulate webhook with delay
    setTimeout(() => {
      const mockClid = generateMockCtwaClid();
      
      setCapturedClid(mockClid);
      setCtwaClid(mockClid);
      setIsCapturing(false);
      
      toast({
        title: "CTWA Click ID Captured",
        description: "Successfully captured the Click to WhatsApp Click ID from the webhook."
      });
    }, 1500);
  };

  const handleContinue = () => {
    navigate("/conversion-event");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">Capture CTWA Click ID</h1>
        <p className="text-gray-500 mt-2">Simulate capturing the Click to WhatsApp Click ID from an ad click</p>
      </div>

      <div className="bg-meta-light p-6 rounded-lg border border-blue-100 space-y-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">What is CTWA Click ID?</h3>
            <p className="text-gray-600 mb-3">
              When a user clicks on a Click-to-WhatsApp ad, Meta generates a unique Click ID (ctwa_clid) 
              that is sent to the business via webhook. This Click ID is used to attribute conversions 
              back to the specific ad that drove the customer to message your business.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">Sample Webhook Payload</h3>
            <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "referral": {
    "ctwa_clid": "${capturedClid || "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a"}"
  }
}`}
            </pre>
          </div>

          <Button 
            className="w-full md:w-auto bg-meta-blue hover:bg-blue-600"
            onClick={handleCapture}
            disabled={isCapturing}
          >
            {isCapturing ? "Capturing..." : "Simulate CTWA Click"}
          </Button>
        </div>

        {capturedClid && (
          <Card>
            <CardContent className="p-4 mt-4">
              <h3 className="font-medium mb-2">Captured CTWA Click ID</h3>
              <div className="p-3 bg-gray-50 rounded-md break-all font-mono text-sm">
                {capturedClid}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleContinue}>
                  Continue to Conversion Event
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium mb-2">Backend Code Example (Node.js)</h3>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`// Webhook endpoint to receive WhatsApp messages
app.post('/webhook', (req, res) => {
  const data = req.body;
  
  // Check if this is a referral from a CTWA ad
  if (data.referral && data.referral.ctwa_clid) {
    const ctwaClid = data.referral.ctwa_clid;
    
    // Store the ctwa_clid for this user session
    // This will be used later when reporting conversion events
    storeCtwaClid(userId, ctwaClid);
    
    console.log("Captured CTWA Click ID:", ctwaClid);
  }
  
  res.status(200).send('Webhook received successfully');
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CaptureCTWA;
