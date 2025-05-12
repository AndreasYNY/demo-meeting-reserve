interface Response {
    success: boolean,
    message: string,
    error: string | null,
}

export interface tokenResponse extends Response {
    data: {
        token: string
    }
}

export interface reserveResponse extends Response {
    data: Reservations[]
}

export interface roomResponse extends Response {
    data: {
        id: number
        name: string
        reservations: Reservations | null
    }[]
}

export interface roomSingleResponse extends Response {
    data: {
        id: number
        name: string
        reservations: Reservations[]
    }
}

export interface Reservations {
    id: number,
    userId: number
    startTime: Date
    endTime: Date
    user: {
        name: string
    }
    room: Room
}

export interface Room {
    id: number
    name: string
    reservations: Reservations | null
}

export interface deleteResponse {
    success: boolean,
    message: string
}

export interface reserveResponse {
    success: boolean,
    message: string
}