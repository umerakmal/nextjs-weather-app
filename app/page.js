'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        } else if (res.status === 401) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Failed to fetch weather', error);
      }
    };

    fetchWeather();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather</h1>
        {weather ? (
          <div className="text-center">
            <p className="text-xl">Temperature: {weather.weatherData.temperature}°F</p>
            <p className="text-xl">Condition: {weather.weatherData.condition}</p>
          </div>
        ) : (
          <p className="text-center">Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
