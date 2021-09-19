import { Connection, createConnection, DatabaseType } from "typeorm";

export default async (): Promise<Connection> => {
    //@ts-ignore
    return createConnection({
        type: process.env.TYPEORM_CONNECTION as DatabaseType,
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
        migrations: [process.env.TYPEORM_MIGRATIONS],
        entities: [process.env.TYPEORM_ENTITIES],
        logging: Boolean(process.env.TYPEORM_LOGGING),
        cli: {
            migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
        }
    });
};
