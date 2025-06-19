import axios from 'axios';
export class Stormglass implements IProvider {

  async getWeather(): Promise<Array<String>>{

    const url_api = process.env.URL_API || ''

    const result = await axios.get(url_api, {
      params: {
        lat: process.env.LAT,
        lng: process.env.LNG,
        params: process.env.PARAMS
      },
      headers: {
        'Authorization': process.env.KEY_API
      }
    })
  
    return result.data.hours
  } 
}

 