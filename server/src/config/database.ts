import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import { UserModel } from '../server/models/user';

dotenv.config();
const { ATLAS_URI } = process.env;

export async function connectToDatabase() {
  try {
    //Conectar cliente ao servidor
    await mongoose
      .connect(ATLAS_URI)
      .then(() => {
        console.log('Conexão com o MongoDB estabelecida com sucesso!');
        // Exemplo de uso do modelo UserModel para executar operações na coleção de usuários
        UserModel.find()
          .then((users: any) => {
            console.log('Users:', users);
          })
          .catch((error: any) => {
            console.error('Error:', error);
          });
      }).catch((error) => {
        console.error('Erro ao conectar com o MongoDB:', error);
      });



    // const database = client.db("testDB");
    // const collection = database.collection("testCol");
    // const docCount = await collection.countDocuments({});
    // console.log(docCount);

    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

//connectToDatabase().catch(console.dir);