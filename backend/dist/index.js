"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routers/router"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const data_source_1 = require("./database/data-source");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "3000");
app.use(express_1.default.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
});
app.use(router_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
