
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  userID: string | null;
  whatsappBusinessId: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
  setWhatsappBusinessId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [whatsappBusinessId, setWhatsappBusinessId] = useState<string | null>(null);

  const login = (token: string, id: string) => {
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserID(id);
    toast({
      title: "Authentication Successful",
      description: "You've been successfully logged in.",
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserID(null);
    setWhatsappBusinessId(null);
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      accessToken, 
      userID,
      whatsappBusinessId,
      login,
      logout,
      setWhatsappBusinessId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
