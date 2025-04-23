
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-meta-light to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-meta-blue mb-4">
          Meta Conversions API Attribution Builder
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Build and test WhatsApp conversions attribution with Meta's Conversions API
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>User Onboarding</CardTitle>
            <CardDescription>Connect your WhatsApp Business Account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Authenticate with Facebook Login and connect your WhatsApp Business Account to get started.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/onboarding" className="w-full">
              <Button className="w-full bg-meta-blue hover:bg-blue-600">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Dataset Creation</CardTitle>
            <CardDescription>Create a dataset for tracking conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Create and manage datasets that will be used to track your WhatsApp conversions.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/dataset-creation" className="w-full">
              <Button className="w-full bg-meta-blue hover:bg-blue-600">Explore Datasets</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>WhatsApp Chat</CardTitle>
            <CardDescription>Simulate WhatsApp conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Test message flows and simulate conversion events in a WhatsApp-like interface.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/whatsapp-chat" className="w-full">
              <Button className="w-full bg-meta-blue hover:bg-blue-600">Start Chatting</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">
          This is a prototype for demonstrating Meta's Conversions API with WhatsApp Business.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://developers.facebook.com/docs/marketing-api/conversions-api/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">API Documentation</Button>
          </a>
          <a href="https://business.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Meta Business Suite</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
