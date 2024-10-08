import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.PGSQL_HOST,
  port: 5432,
  username: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DB,
  logging: true,
  entities: ["./src/models/**.ts"],
  migrations: ["./src/migrations/**.ts"],
  migrationsRun: true
});

dataSource
  .initialize()
  .then(() => console.log("BANCO DE DADOS: Conectado!"))
  .catch((error) =>
    console.error("ERRO: Erro ao se conectar com o banco de dados!", error)
  );

export default dataSource;
