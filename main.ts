import { Connection } from "./modules/Connection.js";
import { Stormglass } from "./modules/Stormglass.js";
import cron from "node-cron";
class main {
    constructor() {
        const teste = true;

        const connection = new Connection();
        const stormglass = new Stormglass();

        if (teste) {
            this.weatherDataUpdate(connection, stormglass);
        } else {
            cron.schedule(
                "0 */6 * * *",
                () => {
                    this.weatherDataUpdate(connection, stormglass);
                },
                { timezone: "America/Sao_Paulo" }
            );
        }
    }

    weatherDataUpdate = async (
        connection: Connection,
        provider: Stormglass
    ) => {
        const partials = await provider.getWeather();
        partials.forEach((partial) => {
            connection.save(partial);
        });
    };
}

new main();
