import * as dotenv from "dotenv";
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

dotenv.config();
const { ATLAS_URI } = process.env;

const credentials = '/home/talita/Documents/Repos/LearnBenchProject/db-certificate/X509-cert-8261803058434215745.pem'


export async function connectToDatabase() {
    const client = new MongoClient(ATLAS_URI, {
        sslKey: credentials,
        sslCert: credentials,
        serverApi: ServerApiVersion.v1
    })
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
