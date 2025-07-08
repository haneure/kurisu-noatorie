"use client";

import { usePolling } from "@/app/hooks/usePooling";
import ProgressBar from "@/components/animations/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  duration: number;
}

export default function Home() {
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [tempAndHumid, setTempAndHumidData] = useState<{ temperature_c: number; temperature_f: number; humidity: number } | null>(null);
  const [error, setError] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0); // Used to reset ProgressBar


  const fetchData = async () => {
    const res = await fetch("/api/system");
    const data = await res.json();
    setSystemInfo(data);
  };

  const fetchTempAndHumid = async () => {
    try {
        const response = await fetch('https://temp-and-humid.noatorie.com/api/temp-and-humid-sensor', {
          headers: {
            'Authorization': 'Bearer your_secret_api_key',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized access. Please check your API key.');
          } else {
            setError('Failed to fetch data.');
          }
        } else {
        const result = await response.json();
        setTempAndHumidData(result);
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      }
  }

  useEffect(() => {
    fetchData();
    fetchTempAndHumid();
    const interval = setInterval(() => {
      fetchData();
      fetchTempAndHumid();
      setFetchTrigger(prev => prev + 1); // Trigger ProgressBar reset
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!systemInfo) return <div className="text-foreground p-6">Loading...</div>;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi 5 : {systemInfo.os.hostname}</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              ["Hostname", systemInfo.os.hostname],
              ["Platform", systemInfo.os.platform],
              ["Architecture", systemInfo.os.arch],
              ["CPU Temperature", `${systemInfo.cpuTemp.toFixed(1)}°C`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}:</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Room Information</h3>
            <div className="space-y-1">
	      <div className="flex justify-between text-sm text-muted-foreground">
	        <span className="text-muted-foreground">Room Temperature:</span>
	        <span className="text-foreground font-medium">{tempAndHumid?.temperature_c}°C</span>
	      </div>
	      <div className="flex justify-between text-sm text-muted-foreground">
	        <span className="text-muted-foreground">Room Humidity:</span>
	        <span className="text-foreground font-medium">{tempAndHumid?.humidity}%</span>
	      </div>
	    </div> 
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
            {systemInfo.cpuUsage.map((usage: string, index: number) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Core {index}</span>
                  <span>{usage}%</span>
                </div>
                <Progress value={parseFloat(usage)} className="h-2" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Used</span>
              <span>
                {systemInfo.memoryUsage.used.toFixed(2)} /{" "}
                {systemInfo.memoryUsage.total.toFixed(2)} GB
              </span>
            </div>
            <Progress
              value={(systemInfo.memoryUsage.used / systemInfo.memoryUsage.total) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
        {/* ProgressBar placed at the bottom of the card */}
        <ProgressBar key={fetchTrigger} duration={5000} />
      </Card>
    </main>
  );
}
