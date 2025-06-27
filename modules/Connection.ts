import { MongoClient, ServerApiVersion } from "mongodb";

export class Connection implements IConnection {
    async getClient(): Promise<MongoClient> {
        const uri = "mongodb://localhost:27017/";

        if (!uri || uri.trim() === "") {
            throw new Error("MongoDB connection URI is not configured");
        }

        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            maxPoolSize: 10,
            minPoolSize: 1,
            maxIdleTimeMS: 30000,
            connectTimeoutMS: 3000,
            serverSelectionTimeoutMS: 5000,
        });

        try {
            await client.connect();
            await client.db().admin().ping();
            return client;
        } catch (error) {
            await client.close().catch(() => {});
            throw new Error(
                `MongoDB connection failed: 
                ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    async save(partial: any): Promise<void> {
        const client = await this.getClient();

        try {
            const database = client.db("weather");
            const forecast = database.collection("forecast-florianopolis");

            await forecast.updateOne(
                { time: partial.time },
                { $setOnInsert: partial },
                { upsert: true }
            );
        } catch (error) {
            throw error;
        } finally {
            await client.close();
        }
    }
}
