import { Connection } from "./modules/Connection.js";
import { Stormglass } from "./modules/Stormglass.js";
import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config();
class main {
    constructor() {
        const connection = new Connection();
        const stormglass = new Stormglass();
        this.weatherDataUpdate(connection, stormglass);

        //cron.schedule(
        //    "0 */6 * * *",
        //    () => {
        //        this.weatherDataUpdate(connection, stormglass);
        //    },
        //    {
        //        timezone: "America/Sao_Paulo",
        //    }
        //);
    }

    weatherDataUpdate = async (
        connection: IConnection,
        provider: IProvider
    ) => {
        const partials = await provider.getWeather();
        partials.forEach((partial) => {
            connection.save(partial);
        });
    };
}

new main();
