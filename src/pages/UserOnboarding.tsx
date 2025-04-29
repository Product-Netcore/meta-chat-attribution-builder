import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

// Add Facebook SDK type definitions
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: any) => void;
      login: (callback: (response: any) => void, params: any) => void;
    };
  }
}

const UserOnboarding = () => {
  const { toast } = useToast();
  const { login, setWhatsappBusinessId } = useAuth();
  const navigate = useNavigate();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [businessAccountId, setBusinessAccountId] = useState("");

  // Initialize Facebook SDK
  useEffect(() => {
    // Load Facebook SDK script
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) return;
      
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '878254782770621',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v22.0'
      });
    };

    // Listen for Embedded Signup message
    const handleWhatsAppSignupMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          console.log('Signup data:', data);
          // TODO: Send data to Netlify function or backend
          toast({
            title: "WhatsApp Signup Data Received",
            description: "Successfully received data from WhatsApp Embedded Signup.",
          });
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    loadFacebookSDK();
    window.addEventListener('message', handleWhatsAppSignupMessage);

    // Cleanup event listener
    return () => {
      window.removeEventListener('message', handleWhatsAppSignupMessage);
    };
  }, [toast]);

  // Simulate Facebook Login (keeping existing functionality)
  const handleFacebookLogin = () => {
    setIsConnecting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockToken = "EAA" + Math.random().toString(36).substring(2, 15);
      const mockUserId = "10158" + Math.floor(Math.random() * 1000000000).toString();
      
      login(mockToken, mockUserId);
      
      setIsConnecting(false);
      toast({
        title: "Successfully Connected",
        description: "Facebook Login successful. You now have access to the necessary permissions.",
      });
    }, 1500);
  };

  // Launch WhatsApp Business Embedded Signup
  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      toast({
        title: "Facebook SDK Not Loaded",
        description: "Please wait for the Facebook SDK to load or refresh the page.",
        variant: "destructive",
      });
      return;
    }

    // Callback for login
    const fbLoginCallback = (response: any) => {
      if (response.authResponse) {
        const code = response.authResponse.code;
        console.log('Authorization code:', code);
        // TODO: POST code to /api/exchange-token
        toast({
          title: "WhatsApp Authorization Successful",
          description: "Successfully received authorization code for WhatsApp Business.",
        });
      } else {
        console.log('Login failed:', response);
        toast({
          title: "WhatsApp Connection Failed",
          description: "Could not connect to WhatsApp Business. Please try again.",
          variant: "destructive",
        });
      }
    };

    window.FB.login(fbLoginCallback, {
      config_id: '758905643123355',
      response_type: 'code',
      override_default_response_type: true,
      extras: {
        setup: {},
        featureType: '',
        sessionInfoVersion: '3',
      }
    });
  };

  // Connect WhatsApp Business Account (keeping existing functionality)
  const handleConnectWhatsApp = () => {
    if (!businessAccountId.trim()) {
      toast({
        title: "Error",
        description: "Please enter your WhatsApp Business Account ID.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setWhatsappBusinessId(businessAccountId);
      setIsConnecting(false);
      
      toast({
        title: "WhatsApp Business Connected",
        description: "Your WhatsApp Business Account has been successfully connected.",
      });
      
      navigate("/dataset-creation");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">User Onboarding</h1>
        <p className="text-gray-500 mt-2">Connect your Facebook account and WhatsApp Business Account to get started</p>
      </div>

      <div className="bg-meta-light p-6 rounded-lg border border-blue-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 1: Connect with Facebook</h2>
          <p className="text-gray-600 mb-4">
            Connect with Facebook to grant the necessary permissions for WhatsApp Business API access.
            This will allow the application to manage your WhatsApp Business Account and handle conversions.
          </p>
          
          <div className="bg-white p-4 rounded border border-gray-200 mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Required Permissions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>whatsapp_business_management</li>
              <li>ads_management</li>
              <li>page_events</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-[#1877F2] hover:bg-[#0d65d9]"
              onClick={handleFacebookLogin}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect with Facebook"}
            </Button>
            
            <Button
              className="bg-[#25D366] hover:bg-[#128C7E]"
              onClick={launchWhatsAppSignup}
              disabled={isConnecting}
            >
              Connect WhatsApp Business
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Step 2: Connect WhatsApp Business Account</h2>
          <p className="text-gray-600 mb-4">
            Enter your WhatsApp Business Account ID to connect your account.
            You can find this ID in your WhatsApp Business Manager.
          </p>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="business-id">WhatsApp Business Account ID</Label>
              <Input 
                id="business-id"
                placeholder="Example: 123456789012345"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Your WhatsApp Business Account ID can be found in the WhatsApp Manager under Account Information.
              </p>
            </div>
            
            <Button 
              className="w-full md:w-auto bg-meta-blue hover:bg-blue-600"
              onClick={handleConnectWhatsApp}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect WhatsApp Business"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
