
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EventReporting = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { events } = useData();
  const [isFetching, setIsFetching] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // Fetch mock report data on component mount
  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = () => {
    setIsFetching(true);
    
    // Simulate fetching report data
    setTimeout(() => {
      // Generate mock report data
      const mockData = {
        campaignPerformance: {
          totalClicks: Math.floor(Math.random() * 1000) + 500,
          ctwaClicks: Math.floor(Math.random() * 500) + 200,
          conversions: events.length > 0 ? events.length : Math.floor(Math.random() * 100) + 10,
          conversionRate: ((Math.random() * 10) + 2).toFixed(2) + "%",
          costPerConversion: "$" + ((Math.random() * 5) + 1).toFixed(2),
          totalSpend: "$" + ((Math.random() * 1000) + 300).toFixed(2),
        }
      };
      
      setReportData(mockData);
      setIsFetching(false);
      
      toast({
        title: "Report Data Retrieved",
        description: "Successfully fetched conversion event reporting data.",
      });
    }, 1500);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-meta-blue">Event Reporting</h1>
        <p className="text-gray-500 mt-2">View and analyze your conversion events</p>
      </div>

      <div className="bg-meta-light p-6 rounded-lg border border-blue-100 space-y-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Campaign Performance</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchReportData}
                  disabled={isFetching}
                >
                  {isFetching ? "Refreshing..." : "Refresh Data"}
                </Button>
              </div>
              
              {reportData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Total Clicks</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.totalClicks}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">CTWA Clicks</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.ctwaClicks}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.conversions}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.conversionRate}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Cost Per Conversion</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.costPerConversion}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Total Spend</p>
                    <p className="text-2xl font-bold">{reportData.campaignPerformance.totalSpend}</p>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center">
                  <p className="text-gray-500">Loading report data...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Event History</h3>
              <Table>
                <TableCaption>A list of your recent conversion events</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{formatDate(event.timestamp)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.status === 'success' 
                              ? 'bg-green-100 text-green-800' 
                              : event.status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                        No events recorded yet. Go to the Conversion Event page to send events.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {events.length === 0 && (
                <div className="mt-4">
                  <Button onClick={() => navigate("/conversion-event")}>
                    Send Conversion Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">API Code Example</h3>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`// Backend code to fetch events from Meta Ads API
fetch('https://graph.facebook.com/v15.0/act_YOUR_AD_ACCOUNT_ID/insights', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  params: {
    fields: 'campaign_name,spend,impressions,clicks,conversions',
    time_range: '{"since":"2023-01-01","until":"2023-01-31"}',
    level: 'campaign'
  }
})
.then(response => response.json())
.then(data => {
  // Process and display event data
  console.log(data);
});`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventReporting;
