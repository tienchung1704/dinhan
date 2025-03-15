import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "cattiestore",
    logging: true,
    synchronize: true,
    dropSchema: false,
    entities: ["src/entities/**.ts"]
})