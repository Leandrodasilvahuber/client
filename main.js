import { save } from "./modules/connection.js";
import { getWeather } from "./modules/stormglass.js";
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config()

async function weatherDataUpdate(){

    const partials = await getWeather()

    partials.forEach(partial => {
        save(partial)
    });
}

//cron.schedule('30 4 * * *', () => {
    weatherDataUpdate()
//},{
 //   scheduled: true,
 //   timezone: "America/Sao_Paulo"
//});

