'use client'

import ProgressBar from '@/components/animations/progress-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'

interface SystemInfo {
  os: {
    hostname: string
    platform: string
    arch: string
  }
  cpuTemp: number
  cpuUsage: string[]
  memoryUsage: {
    used: number
    total: number
  }
}

export default function StatsClient() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [tempAndHumid, setTempAndHumidData] = useState<{
    temperature_c: number
    temperature_f: number
    humidity: number
  } | null>(null)
  const [, setError] = useState('')
  const [fetchTrigger, setFetchTrigger] = useState(0) // Used to reset ProgressBar
  const [sensorFetchTrigger, setSensorFetchTrigger] = useState(0) // Used to reset sensor ProgressBar

  const fetchData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_RPI_5_API_URL + '/stats', {
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_RPI_5_API_KEY
      }
    })
    const data = await res.json()
    setSystemInfo(data)
  }

  const fetchTempAndHumid = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_RPI_5_API_URL + '/sensors/dht22-room',
        {
          headers: {
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_RPI_5_API_KEY
          }
        }
      )

      if (!response.ok) {
        if (response.status === 401) {
          setError('Unauthorized access. Please check your API key.')
        } else {
          setError('Failed to fetch data.')
        }
      } else {
        const result = await response.json()
        setTempAndHumidData(result)
      }
    } catch (err) {
      setError('An error occurred while fetching data.' + err)
    }
  }

  useEffect(() => {
    fetchData()
    fetchTempAndHumid()

    // Fetch system stats every 5 seconds
    const statsInterval = setInterval(() => {
      fetchData()
      setFetchTrigger(prev => prev + 1) // Trigger ProgressBar reset
    }, 5000)

    // Fetch DHT22 sensor data every 30 seconds to avoid sensor damage
    const sensorInterval = setInterval(() => {
      fetchTempAndHumid()
      setSensorFetchTrigger(prev => prev + 1) // Trigger sensor ProgressBar reset
    }, 30000)

    return () => {
      clearInterval(statsInterval)
      clearInterval(sensorInterval)
    }
  }, [])

  if (!systemInfo) return <div className='text-foreground p-6'>Loading...</div>

  return (
    <main className='bg-background flex min-h-screen flex-col items-center justify-center p-6'>
      <h1 className='text-foreground mb-6 text-3xl font-bold'>
        Raspberry Pi 5 : {systemInfo.os.hostname}
      </h1>

      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            {[
              ['Hostname', systemInfo.os.hostname],
              ['Platform', systemInfo.os.platform],
              ['Architecture', systemInfo.os.arch],
              ['CPU Temperature', `${systemInfo.cpuTemp.toFixed(1)}°C`]
            ].map(([label, value]) => (
              <div key={label} className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>{label}:</span>
                <span className='text-foreground font-medium'>{value}</span>
              </div>
            ))}
          </div>

          <div className='space-y-2'>
            <h3 className='text-foreground text-lg font-semibold'>
              Room Information
            </h3>
            <div className='space-y-1'>
              <div className='text-muted-foreground flex justify-between text-sm'>
                <span className='text-muted-foreground'>Room Temperature:</span>
                <span className='text-foreground font-medium'>
                  {tempAndHumid?.temperature_c}°C
                </span>
              </div>
              <div className='text-muted-foreground flex justify-between text-sm'>
                <span className='text-muted-foreground'>Room Humidity:</span>
                <span className='text-foreground font-medium'>
                  {tempAndHumid?.humidity}%
                </span>
              </div>
            </div>
            <ProgressBar key={sensorFetchTrigger} duration={30000} />
          </div>

          <div className='space-y-2'>
            <h3 className='text-foreground text-lg font-semibold'>CPU Usage</h3>
            {systemInfo.cpuUsage.map((usage: string, index: number) => (
              <div key={index} className='space-y-1'>
                <div className='text-muted-foreground flex justify-between text-sm'>
                  <span>Core {index}</span>
                  <span>{usage}%</span>
                </div>
                <Progress value={parseFloat(usage)} className='h-2' />
              </div>
            ))}
          </div>

          <div className='space-y-2'>
            <h3 className='text-foreground text-lg font-semibold'>
              Memory Usage
            </h3>
            <div className='text-muted-foreground flex justify-between text-sm'>
              <span>Used</span>
              <span>
                {(systemInfo.memoryUsage.used / 1024 / 1024 / 1024).toFixed(2)}{' '}
                /{' '}
                {(systemInfo.memoryUsage.total / 1024 / 1024 / 1024).toFixed(2)}{' '}
                GB
              </span>
            </div>
            <Progress
              value={
                (systemInfo.memoryUsage.used / systemInfo.memoryUsage.total) *
                100
              }
              className='h-2'
            />
          </div>
        </CardContent>
        {/* ProgressBar placed at the bottom of the card */}
        <ProgressBar key={fetchTrigger} duration={5000} />
      </Card>
    </main>
  )
}
