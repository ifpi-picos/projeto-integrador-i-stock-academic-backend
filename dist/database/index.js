"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = async () => {
    const defaultOptions = await typeorm_1.getConnectionOptions();
    return typeorm_1.createConnection(Object.assign(defaultOptions, {
        database: process.env.NODE_ENV === "test"
            ? "./src/database/database.test.sqlite"
            : defaultOptions.database,
    }));
};
