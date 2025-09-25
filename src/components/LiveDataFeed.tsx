import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Waves, Fish, AlertTriangle } from "lucide-react";

interface DataPoint {
  id: string;
  timestamp: string;
  species: string;
  location: string;
  depth: number;
  temperature: number;
  status: "normal" | "alert" | "critical";
}

const LiveDataFeed = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [isLive, setIsLive] = useState(true);

  const generateDataPoint = (): DataPoint => {
    const species = [
      "Bluefin Tuna", "Great White Shark", "Clownfish", "Atlantic Cod", 
      "Pacific Salmon", "Yellowfin Tuna", "Barracuda", "Manta Ray"
    ];
    
    const locations = [
      "North Pacific", "South Atlantic", "Indian Ocean", "Mediterranean",
      "Coral Triangle", "Caribbean Sea", "Arctic Ocean", "Antarctic Waters"
    ];

    const statuses: ("normal" | "alert" | "critical")[] = ["normal", "normal", "normal", "alert", "critical"];

    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      species: species[Math.floor(Math.random() * species.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      depth: Math.floor(Math.random() * 2000) + 10,
      temperature: Math.round((Math.random() * 25 + 5) * 10) / 10,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  };

  useEffect(() => {
    // Initialize with some data
    setDataPoints(Array.from({ length: 5 }, generateDataPoint));

    if (!isLive) return;

    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoint = generateDataPoint();
        return [newPoint, ...prev.slice(0, 9)]; // Keep only last 10 points
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "alert": return <Activity className="h-4 w-4 text-yellow-500" />;
      default: return <Fish className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "alert": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Waves className="h-5 w-5 mr-2 text-primary" />
            Live Data Feed
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs text-muted-foreground">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {dataPoints.map((point, index) => (
            <div 
              key={point.id} 
              className={`p-3 rounded-lg border transition-all duration-300 ${
                index === 0 ? 'bg-primary/5 border-primary/20 scale-[1.02]' : 'bg-card'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(point.status)}
                  <span className="font-medium text-sm">{point.species}</span>
                </div>
                <Badge className={`text-xs ${getStatusColor(point.status)}`}>
                  {point.status.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>📍 {point.location}</div>
                <div>🕒 {point.timestamp}</div>
                <div>📊 {point.depth}m depth</div>
                <div>🌡️ {point.temperature}°C</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isLive ? 'Pause Feed' : 'Resume Feed'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveDataFeed;