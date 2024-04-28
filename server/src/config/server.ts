import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";
import { userRouter } from "../server/routes/user.routes";
import { tablesRouter } from "../server/routes/table.routes";
import { cardRouter } from "../server/routes/card.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase()
    .then(() => {
        // Criar instância do servidor Express
        const app = express();

        // Middleware do CORS
        app.use(cors());

        // Middleware para parsing do corpo das requisições
        app.use(express.json());

        // Rotas
        app.use("/tableContents", tablesRouter);
        app.use("/users", userRouter);
        app.use("/cards", cardRouter);
        

        // start the Express server
        app.listen(5200, () => {
            console.info(`Server running at http://localhost:5200...`);
        });

        // Capture o sinal de interrupção e desconecte-se do banco de dados antes de encerrar o servidor
        process.on('SIGINT', async () => {
            try {
                await mongoose.disconnect();
                console.info('Desconectado do banco de dados.');
                process.exit(0); // Encerre o processo Node.js com código de saída 0 (encerramento normal)
            } catch (error) {
                console.error('Erro ao desconectar do banco de dados:', error);
                process.exit(1); // Encerre o processo Node.js com código de saída 1 (encerramento com erro)
            }
        });

    })
    .catch(error => console.error(error));

    //npx ts-node src/config/server.ts