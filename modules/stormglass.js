
import axios from 'axios';

export async function getWeather(){

  const result = await axios.get(process.env.URL_API_STORMGLASS, {
    params: {
      lat: process.env.LAT,
      lng: process.env.LNG,
      params: process.env.PARAMS
    },
    headers: {
      'Authorization': process.env.KEY_STORMGLASS
    }
  })

  return result.data.hours
} 