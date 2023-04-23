import * as dotenv from "dotenv";
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

dotenv.config();
const { ATLAS_URI } = process.env;

const credentials = '../../db-certificate'

const client = new MongoClient(ATLAS_URI, {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
})

export async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

connectToDatabase().catch(console.dir);
