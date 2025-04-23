
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DatasetCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { accessToken, whatsappBusinessId } = useAuth();
  const { setDatasetId } = useData();
  
  const [isCreating, setIsCreating] = useState(false);
  const [businessId, setBusinessId] = useState(whatsappBusinessId || "");
  const [datasetName, setDatasetName] = useState("WhatsApp Conversions Dataset");

  const handleCreateDataset = () => {
    if (!businessId) {
      toast({
        title: "Error",
        description: "Please enter your WhatsApp Business Account ID",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate API call to create dataset
    setTimeout(() => {
      // Mock successful response
      const mockDatasetId = "ds_" + Math.random().toString(36).substring(2, 15);
      setDatasetId(mockDatasetId);
      
      setIsCreating(false);
      
      toast({
        title: "Dataset Created",
        description: "Your dataset has been successfully created with ID: " + mockDatasetId,
      });
    }, 1500);
  };

  const handleNextStep = () => {
    navigate("/whatsapp-chat");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">Dataset Creation</h1>
        <p className="text-gray-500 mt-2">Create a dataset to track your WhatsApp conversions</p>
      </div>

      <div className="bg-meta-light p-6 rounded-lg border border-blue-100 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="business-id">WhatsApp Business Account ID</Label>
            <Input
              id="business-id"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              placeholder="Enter your WhatsApp Business Account ID"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">This should be your WhatsApp Business Account ID from Meta Business Manager.</p>
          </div>

          <div>
            <Label htmlFor="dataset-name">Dataset Name</Label>
            <Input
              id="dataset-name"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="Enter a name for your dataset"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">This name will help you identify your dataset in Meta Ads Manager.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">Dataset Creation API Endpoint (Example)</h3>
            <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
              {`fetch('https://your-backend-endpoint/create-dataset', {
  method: 'POST',
  body: JSON.stringify({ 
    whatsapp_business_account_id: "${businessId || "<WHATSAPP_BUSINESS_ACCOUNT_ID>"}",
    access_token: "${accessToken || "<ACCESS_TOKEN>"}"
  }),
});`}
            </pre>
          </div>

          <Button 
            className="w-full md:w-auto bg-meta-blue hover:bg-blue-600" 
            onClick={handleCreateDataset}
            disabled={isCreating}
          >
            {isCreating ? "Creating Dataset..." : "Create Dataset"}
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dataset ID</h4>
                  <p className="text-sm text-gray-500 mt-1">Your Dataset ID will appear here after creation</p>
                </div>
                <Button onClick={handleNextStep}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatasetCreation;
