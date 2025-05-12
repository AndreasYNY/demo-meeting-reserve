import { Database } from "./types";
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { env } from "../env";
const dialect = new PostgresDialect({
    pool: new Pool({
        // connectionString: env.DATABASE_URL,
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
        max: 10
    })
})

export const db = new Kysely<Database>({
    dialect
})
