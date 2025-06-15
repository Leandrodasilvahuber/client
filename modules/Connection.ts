
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Connection implements IConnection {

    async getClient(): Promise<MongoClient>{

        const uri = process.env.URI_MONGO || ''

        const client =  new MongoClient(uri,  {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            }
        );

        return client.connect()
    } 

    async save(parcial: any): Promise<void> {
        const client = await this.getClient()
        const database  = await client.db(process.env.DB_MONGO)
        const forecast = database.collection(process.env.TABLE_MONGO || '');

        await forecast.updateOne(
            { time: parcial.time },  
            { $setOnInsert: parcial },  
            { upsert: true }  
        );

        await client.close();
    }
}
