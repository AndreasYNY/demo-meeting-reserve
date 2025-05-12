import { db } from "../kysely/database"
import { ReservationsTable } from "../kysely/types"

export async function reserveRoom({roomId, userId, startTime, endTime}: {roomId: number, userId: number, startTime: Date, endTime: Date}) {
    const room = await db.selectFrom('rooms').where('rooms.id', '=', roomId).execute()
    if (room.length === 0) {
        throw new Error("Room not found")
    }
    const reservation = await db.selectFrom('reservations').where('reservations.roomId', '=', roomId)
        .where('reservations.startTime', '<=', endTime)
        .where('reservations.endTime', '>=', startTime)
        .execute()
    if (reservation.length > 0) {
        throw new Error("Room is already reserved")
    }
    // await db.updateTable('rooms').set({isReserved: true}).where('rooms.id', '=', roomId).execute()
    return await db.insertInto('reservations').values({
        roomId: roomId,
        userId: userId,
        startTime: new Date(startTime),
        endTime: new Date(endTime)
    }).returning('id').execute()
}


export async function getReservation({roomId}: {roomId: number}) {
    const room = await db.selectFrom('rooms').where('rooms.id', '=', roomId).execute()
    if (room.length === 0) {
        throw new Error("Room not found")
    }
    const reservations = await db.selectFrom('reservations').where('reservations.roomId', '=', roomId).execute()
    return reservations
}

export async function getReservations() {
    const reservations = await db.selectFrom('reservations')
        .select(['reservations.id', 'reservations.userId', 'reservations.roomId', 'reservations.startTime', 'reservations.endTime'])
        .leftJoin('users', 'users.id', 'reservations.userId')
        .leftJoin('rooms', 'rooms.id', 'reservations.roomId')
        .select(['users.username', 'rooms.name'])
        .execute()
    const reservationMapped = reservations.map((reservation) => {
        const { username, name, ...reservationData } = reservation;
        return {
            ...reservationData,
            user: {
                username: username
            },
            room: {
                name: name
            }
        };
    }
    )
    return reservationMapped
}

export async function deleteReservation({reservationId}: {reservationId: number}) {
    const reservation = await db.selectFrom('reservations').where('reservations.id', '=', reservationId).execute() as ReservationsTable[] 
    if (reservation.length === 0) {
        throw new Error("Reservation not found")
    }
    // await db.updateTable('rooms').set({isReserved: false}).where('rooms.id', '=', reservation[0].roomId).execute()
    return await db.deleteFrom('reservations').where('reservations.id', '=', reservationId).returning('id').execute()
}

export async function getReservationsByUserId({userId}: {userId: number}) {
    const reservations = await db.selectFrom('reservations')
        .select(['reservations.id', 'reservations.userId', 'reservations.roomId', 'reservations.startTime', 'reservations.endTime'])
        .where('reservations.userId', '=', userId)
        .leftJoin('users', 'users.id', 'reservations.userId')
        .leftJoin('rooms', 'rooms.id', 'reservations.roomId')
        .select(['users.username', 'rooms.id as roomsId', 'rooms.name'])
        .execute()
    const reservationMapped = reservations.map((reservation) => {
        const { username, name, roomsId, ...reservationData } = reservation;
        return {
            ...reservationData,
            user: {
                username: username
            },
            room: {
                name: name,
                id: roomsId,
            }
        };
    })

    return reservationMapped
}

export async function getReservationsByRoomId({roomId}: {roomId: number}) {
    const reservations = await db.selectFrom('reservations')
        .select(['reservations.id', 'reservations.userId', 'reservations.roomId', 'reservations.startTime', 'reservations.endTime'])
        .where('reservations.roomId', '=', roomId)
        .leftJoin('users', 'users.id', 'reservations.userId')
        .leftJoin('rooms', 'rooms.id', 'reservations.roomId')
        .select(['users.username', 'rooms.name'])
        .execute()
    const reservationMapped = reservations.map((reservation) => {
        const { username, name, ...reservationData } = reservation;
        return {
            ...reservationData,
            user: {
                username: username
            },
            room: {
                name: name
            }
        };
    }
    )
    return reservationMapped
}