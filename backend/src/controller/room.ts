import { db } from "../kysely/database"
import { jsonArrayFrom} from 'kysely/helpers/postgres'

export async function createRoom({name}: {name: string}) {
    const nameCheck = await db.selectFrom('rooms').where('rooms.name', '=', name).execute()
    if (nameCheck.length > 0) {
        throw new Error("Room name is already taken")
    }
    return await db.insertInto('rooms').values({name: name}).returning('id').execute()
}

export async function getRoom({roomId}: {roomId: number}) {
    const room = await db.selectFrom('rooms').selectAll().where('rooms.id', '=', roomId).execute()
    if (room.length === 0) {
        throw new Error("Room not found")
    }
    return room[0]
}

export async function getRooms() {
    const reservations = await db.selectFrom('rooms').selectAll().select((eb) => jsonArrayFrom(
        eb.selectFrom('reservations')
            .select(['reservations.id', 'reservations.userId', 'reservations.startTime', 'reservations.endTime'])
            .whereRef('reservations.roomId', '=', 'rooms.id')
    ).as("reservations")).execute();

    return reservations
}

export async function deleteRoom({roomId}: {roomId: number}) {
    const room = await db.selectFrom('rooms').where('rooms.id', '=', roomId).execute()
    if (room.length === 0) {
        throw new Error("Room not found")
    }
    return await db.deleteFrom('rooms').where('rooms.id', '=', roomId).returning('id').execute()
}

