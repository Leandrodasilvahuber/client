
import { MongoClient, ServerApiVersion } from 'mongodb';

async function getClient(){

    const uri = process.env.URI_MONGO

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

export async function save(parcial) {
  
    const client = await getClient()
    const database  = await client.db(process.env.DB_MONGO)
    const forecast = database.collection(process.env.TABLE_MONGO);

    await forecast.updateOne(
        { time: parcial.time },  
        { $setOnInsert: parcial },  
        { upsert: true }  
    );

    await client.close();
}
