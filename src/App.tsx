
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserOnboarding from "./pages/UserOnboarding";
import DatasetCreation from "./pages/DatasetCreation";
import WhatsAppChat from "./pages/WhatsAppChat";
import CaptureCTWA from "./pages/CaptureCTWA";
import ConversionEvent from "./pages/ConversionEvent";
import EventReporting from "./pages/EventReporting";

// Context
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Layout
import AppLayout from "./components/layouts/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<AppLayout />}>
                <Route path="/onboarding" element={<UserOnboarding />} />
                <Route path="/dataset-creation" element={<DatasetCreation />} />
                <Route path="/whatsapp-chat" element={<WhatsAppChat />} />
                <Route path="/capture-ctwa" element={<CaptureCTWA />} />
                <Route path="/conversion-event" element={<ConversionEvent />} />
                <Route path="/event-reporting" element={<EventReporting />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
