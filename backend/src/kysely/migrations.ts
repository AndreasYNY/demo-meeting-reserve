import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('users')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('username', 'varchar', (col) => col.notNull())
        .addColumn('password', 'varchar', (col) => col.notNull())
        .addColumn('isAdmin', 'boolean', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .execute()
        .then(() => console.log("Users table successfully migrated!"))
        .catch((err) => console.error("Error migrating Users table:", err))

    await db.schema
        .createTable('rooms')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar', (col) => col.notNull().unique())
        // .addColumn('isReserved', 'boolean', (col) => col.defaultTo(false))
        .execute()
        .then(() => console.log("Rooms table successfully migrated!"))
        .catch((err) => console.error("Error migrating Rooms table:", err))

    await db.schema
        .createTable('reservations')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('userId', 'integer', (col) => col.notNull().references('users.id'))
        .addColumn('roomId', 'integer', (col) => col.references('rooms.id').onDelete('cascade').notNull())
        .addColumn('startTime', 'timestamp', (col) => col.notNull())
        .addColumn('endTime', 'timestamp', (col) => col.notNull())
        .execute()
        .then(() => console.log("Reservations table successfully migrated!"))
        .catch((err) => console.error("Error migrating Reservations table:", err))

    await db.schema
        .createIndex('reservations_roomId_index')
        .on('reservations')
        .column('roomId')
        .execute()
        .then(() => console.log("Index on roomId in Reservations table successfully created!"))
        .catch((err) => console.error("Error creating index on roomId in Reservations table:", err))
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('reservations').execute()
        .then(() => console.log("Reservations table successfully dropped!"))
        .catch((err) => console.error("Error dropping Reservations table:", err))

    await db.schema.dropTable('rooms').execute()
        .then(() => console.log("Rooms table successfully dropped!"))
        .catch((err) => console.error("Error dropping Rooms table:", err))

    await db.schema.dropTable('users').execute()
        .then(() => console.log("Users table successfully dropped!"))
        .catch((err) => console.error("Error dropping Users table:", err))
}