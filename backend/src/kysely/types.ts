import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable
} from 'kysely'

export interface Database {
    users: UsersTable
    rooms: RoomsTable
    reservations: ReservationsTable
}

export interface UsersTable {
    id: Generated<number>
    username: ColumnType<string, string, string> & { unique: true }
    password: string
    isAdmin: boolean
}

export interface RoomsTable {
    id: Generated<number>
    name: string
    // isReserved: boolean
}

export interface ReservationsTable {
    id: Generated<number>
    userId: number
    roomId: number
    startTime: Date
    endTime: Date
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>

export type Room = Selectable<RoomsTable>
export type NewRoom = Insertable<RoomsTable>
export type RoomUpdate = Updateable<RoomsTable>

export type Reservation = Selectable<ReservationsTable>
export type NewReservation = Insertable<ReservationsTable>
export type ReservationUpdate = Updateable<ReservationsTable>