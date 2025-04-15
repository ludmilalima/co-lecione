import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { connectToDatabase } from "./database";
import { userRouter } from "../server/routes/user.routes";
import { tablesRouter } from "../server/routes/table.routes";
import { objectRouter } from "../server/routes/object.routes";
import { learningPlanRouter } from "../server/routes/learningPlan.routes";
import { sendGridRouter } from "../server/routes/nodemailer.routes";
import path from "path";

// Load environment variables from the .env file, where the ATLAS_URI is configured
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });


if (!process.env.ATLAS_URI) {
  throw new Error('ATLAS_URI não definido no arquivo .env');
}

const { ATLAS_URI, PORT } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

const devUrl = process.env.DEV_URL;
const prodUrl = process.env.PROD_URL;
const currentEnv = process.env.NODE_ENV;

const url = currentEnv === "prod" ? prodUrl : devUrl;

connectToDatabase()
  .then(() => {
    // Criar instância do servidor Express
    const app = express();

    // Middleware do CORS
    app.use(cors());

    // Middleware para parsing do corpo das requisições
    app.use(
      express.json({
        limit: "50mb", // Limita o tamanho do corpo da requisição a 50 megabyte
        strict: true, // Garante que apenas objetos e arrays sejam aceitos
        type: "application/json", // Aceita apenas requisições com MIME type application/json
        verify: (req, res, buf, encoding) => {
          try {
            // Tenta analisar o buffer da requisição como JSON
            JSON.parse(buf.toString(encoding as BufferEncoding));
          } catch (error) {
            // Lança um erro se o corpo da requisição não for JSON válido
            return (res as any).status(400).json({ error: "Invalid JSON" });
          }
        },
      })
    );

    // Middleware do Swagger
    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Express API with Swagger",
          version: "1.0.0",
          description: "A simple Express API",
        },
        servers: [
          {
            url: `${url}:${PORT}`,
          },
        ],
      },
      apis: ["src/server/routes/*.routes.ts"],
    };
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Use the email router
    //app.use('/api', emailRouter);
    app.use("/api", sendGridRouter);

    // Rotas
    app.use("/users", userRouter);
    app.use("/table-contents", tablesRouter);
    app.use("/objects", objectRouter);
    app.use("/itineraries", learningPlanRouter);

    // start the Express server
    app.listen(PORT, () => {
      console.info(`Server running at ${url}:${PORT}...`);
    });

    // Capture o sinal de interrupção e desconecte-se do banco de dados antes de encerrar o servidor
    process.on("SIGINT", async () => {
      try {
        await mongoose.disconnect();
        console.info("Desconectado do banco de dados.");
        process.exit(0); // Encerre o processo Node.js com código de saída 0 (encerramento normal)
      } catch (error) {
        console.error("Erro ao desconectar do banco de dados:", error);
        process.exit(1); // Encerre o processo Node.js com código de saída 1 (encerramento com erro)
      }
    });
  })
  .catch((error) => console.error(error));

//npx ts-node src/config/server.ts
