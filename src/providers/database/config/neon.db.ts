import dotenv from "dotenv"
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm"
dotenv.config({
  path: [
    path.resolve(process.cwd(), ".env.dev"),
    path.resolve(process.cwd(), ".env"),
  ],
});

export const neonDatabase: DataSourceOptions = {
    type: 'postgres',
    url: process.env.NEON_DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [path.resolve(__dirname, '../entities/**/*.entity.{ts,js}')],
    migrations: [path.resolve(__dirname, '../migrations/**/*{.ts,.js}')],
    synchronize: false
}

export default new DataSource(neonDatabase)