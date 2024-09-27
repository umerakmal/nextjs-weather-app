import { NextResponse } from 'next/server';
import { verifyAuth } from '../../../middleware/auth';

export async function GET() {
  // Mock weather data
  const weatherData = {
    temperature: 72,
    condition: 'Sunny',
  };

//   return verifyAuth(() => NextResponse.json(weatherData));
return NextResponse.json({ weatherData });

}
