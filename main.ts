import { Connection } from "./modules/Connection.js";
import { Stormglass } from "./modules/Stormglass.js";
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config()
class main {
    constructor() {

        const connection = new Connection()
        const stormglass = new Stormglass()
        
        //cron.schedule('0 */6 * * *', () => {
            this.weatherDataUpdate(connection, stormglass);
       // }, {
        //    scheduled: true,
       //     timezone: "America/Sao_Paulo"
       // });
    }

    async weatherDataUpdate(connection: Connection, provider: IProvider){
        const partials = await provider.getWeather()
        partials.forEach(partial => {
            connection.save(partial)
        });
    }
}

new main();
