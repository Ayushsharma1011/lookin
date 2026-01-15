import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: null,
    condition: '',
    humidity: null,
    windSpeed: null,
    city: 'Dharamshala'
  });

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      const data = await response.json();
      const current = data.current;

      const condition = mapWeatherCodeToCondition(current.weather_code);

      setWeather(prev => ({
        ...prev,
        temperature: current.temperature_2m,
        condition,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m
      }));
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  const mapWeatherCodeToCondition = (code) => {
    const weatherMap = {
      0: 'Sunny',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Fog',
      51: 'Light Drizzle',
      61: 'Light Rain',
      71: 'Snowfall',
      95: 'Thunderstorm'
    };
    return weatherMap[code] || 'Cloudy';
  };

  // ✅ Always fetch for Dharamshala
  useEffect(() => {
    const dharamshalaLat = 32.22;
    const dharamshalaLon = 76.32;

    fetchWeather(dharamshalaLat, dharamshalaLon);
    const interval = setInterval(() => {
      fetchWeather(dharamshalaLat, dharamshalaLon);
    }, 15 * 60 * 1000); // refresh every 15 min

    return () => clearInterval(interval);
  }, []);

  const isNight = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour <= 6;
  };

  const getWeatherIcon = (condition) => {
    if (isNight()) return <Moon className="h-6 w-6 text-indigo-600" />;

    switch (condition) {
      case 'Sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'Light Rain':
      case 'Thunderstorm':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                {getWeatherIcon(weather.condition)}
                <span className="font-semibold text-gray-800">{weather.city}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Thermometer className="h-4 w-4 text-red-500" />
                <span className="text-2xl font-bold text-gray-800">
                  {weather.temperature !== null ? `${weather.temperature}°C` : '--'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{weather.condition}</p>
            </div>
            <div className="text-right text-xs text-gray-600">
              <p>Humidity: {weather.humidity ?? '--'}%</p>
              <p>Wind: {weather.windSpeed ?? '--'} km/h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;
