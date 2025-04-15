import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
import path from "path";
console.log(path);
dotenv.config({ path: path.resolve(__dirname, "../../src/.env") });

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error('ATLAS_URI não definido no arquivo .env');
}

const devCertPath = process.env.DEV_ATLAS_URI_PATH;
const prodCertPath = process.env.PROD_ATLAS_URI_PATH;
const currentEnv = process.env.NODE_ENV;

const ATLAS_URI_PATH = currentEnv === 'prod' ? prodCertPath : devCertPath;

console.log(`Using certificate path: ${ATLAS_URI_PATH}`);

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