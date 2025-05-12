import Elysia from "elysia";
import { up, down } from "../kysely/migrations";
import { db } from "../kysely/database";

export const migration = new Elysia({ prefix: "/migrations" })

// kinda lazy to make a database check on startup
// since this is a non important thing anyways, ill just ping this endpoint 
// on docker entrypoint
// TODO(seeders)
migration.get('/up', () => {
    try {
        up(db)
    } catch (error) {
        console.error(error)
    }
})

migration.get('/down', () => {
    try {
        down(db)
    } catch (error) {
        console.error(error)
    }
})