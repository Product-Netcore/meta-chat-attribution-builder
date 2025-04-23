
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface DataContextType {
  datasetId: string | null;
  ctwaClid: string | null;
  events: Event[];
  setDatasetId: (id: string) => void;
  setCtwaClid: (id: string) => void;
  addEvent: (event: Event) => void;
}

interface Event {
  id: string;
  name: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  details?: object;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [ctwaClid, setCtwaClid] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
    toast({
      title: "Event Logged",
      description: `${event.name} event has been recorded.`,
    });
  };

  return (
    <DataContext.Provider value={{ 
      datasetId, 
      ctwaClid, 
      events,
      setDatasetId,
      setCtwaClid,
      addEvent
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
