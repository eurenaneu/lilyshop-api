import "reflect-metadata";
import express from "express";
import router from "./routes/router"
import { config } from "dotenv";

async function main() {
  config();

  const app = express();

  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use("/api/v1", router);

  app.listen(port, () => console.log("SERVIDOR: Conectado!\nPORTA:", port));
}

main();
