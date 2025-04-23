
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const navItems = [
  { path: "/onboarding", label: "User Onboarding" },
  { path: "/dataset-creation", label: "Dataset Creation" },
  { path: "/whatsapp-chat", label: "WhatsApp Chat" },
  { path: "/capture-ctwa", label: "Capture CTWA" },
  { path: "/conversion-event", label: "Conversion Event" },
  { path: "/event-reporting", label: "Event Reporting" },
];

const AppLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-meta-blue text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Meta CAPI Attribution Builder</Link>
          <div>
            {isAuthenticated ? (
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-meta-blue" onClick={logout}>Logout</Button>
            ) : (
              <Link to="/onboarding">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-meta-blue">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 md:flex gap-6">
        <aside className="md:w-64 mb-6 md:mb-0">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-meta-blue text-white"
                        : "text-gray-700 hover:bg-meta-light"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <Card>
            <CardContent className="p-6">
              <Outlet />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
