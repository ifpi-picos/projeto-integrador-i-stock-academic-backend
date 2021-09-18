"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
// import { createConnection } from "typeorm";
const database_1 = __importDefault(require("./database"));
const app = express_1.default();
exports.app = app;
// createConnection()
database_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({
    origin: process.env.CLIENT_URL,
    methods: "GET,PUT,POST,OPTIONS, DELETE",
    allowedHeaders: "Accept, Content-Type, Authorization"
}));
app.use(routes_1.router);
