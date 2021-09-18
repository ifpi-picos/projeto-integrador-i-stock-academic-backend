import express from "express";
import cors from "cors";
import { router } from "./routes";
// import { createConnection } from "typeorm";
import connection from "./database";

const app = express();
// createConnection()
connection()

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,PUT,POST,OPTIONS, DELETE",
        allowedHeaders: "Accept, Content-Type, Authorization"
    })
);

app.use(router);

export { app };
