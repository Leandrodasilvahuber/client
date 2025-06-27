import axios from "axios";

export class Stormglass implements IProvider {
    async getWeather(): Promise<Array<String>> {
        const url_api = "https://api.stormglass.io/v2/weather/point";

        const result = await axios.get(url_api, {
            params: {
                lat: "-27.5945",
                lng: "-48.5477",
                params: "airTemperature,precipitation,windSpeed,windDirection,waveDirection,waveHeight,wavePeriod,cloudCover",
            },
            headers: {
                Authorization:
                    "6964df72-3cc5-11f0-976d-0242ac130006-6964dfe0-3cc5-11f0-976d-0242ac130006",
            },
        });

        return result.data.hours;
    }
}
