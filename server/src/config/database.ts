import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const { ATLAS_URI, ATLAS_URI_PATH } = process.env;

if (!ATLAS_URI || !ATLAS_URI_PATH) {
  throw new Error('ATLAS_URI ou ATLAS_URI_PATH não definido no arquivo .env');
}

const options = {
  tls: true,
  tlsCertificateKeyFile: ATLAS_URI_PATH,
  tlsAllowInvalidCertificates: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export async function connectToDatabase() {
  try {
    //Conectar cliente ao servidor
    await mongoose
      .connect(ATLAS_URI, options)
      .then(() => {
        console.info('Conexão com o MongoDB estabelecida com sucesso!');
        // Exemplo de uso do modelo UserModel para executar operações na coleção de usuários


      }).catch((error) => {
        console.error('Erro ao conectar com o MongoDB:', error);
      });



    // const database = client.db("testDB");
    // const collection = database.collection("testCol");
    // const docCount = await collection.countDocuments({});
    // console.log(docCount);

    // perform actions using client
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
  }
}

//connectToDatabase().catch(console.dir);