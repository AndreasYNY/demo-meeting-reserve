import {Elysia, t} from "elysia";
import * as reserveController from "../controller/reserve";
import { decodeJwt } from "jose";

export const reserve = new Elysia({ prefix: "/reserve" })

reserve.post('/', async({ body, cookie }) => {
    if (!cookie.token) {
        return { success: false, message: "Unauthorized" }
    }
    const userId = decodeJwt(cookie.token.value!).id as number

    try {
        const result = await reserveController.reserveRoom({ roomId: body.roomId, userId: userId, startTime: body.startTime, endTime: body.endTime });
        return { success: true, message: "Room reserved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Room reservation failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    body: t.Object({
        roomId: t.Number(),
        startTime: t.Date(),
        endTime: t.Date()
    }),
    cookie: t.Object({
        token: t.String()
    })
})

reserve.get('/cancel/:id', async({ params: { id } }) => {
    try {
        const result = await reserveController.deleteReservation({ reservationId: id });
        return { success: true, message: "Reservation cancelled successfully", data: result };
    } catch (error) {
        return { success: false, message: "Reservation cancellation failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    params: t.Object({
        id: t.Number()
    })
})

reserve.get('/getAll', async() => {
    try {
        const result = await reserveController.getReservations();
        return { success: true, message: "Reservations retrieved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Reservation retrieval failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
})

reserve.get('/getByUserId/:id', async({ params: { id } }) => {
    try {
        const result = await reserveController.getReservationsByUserId({ userId: id });
        return { success: true, message: "Reservations retrieved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Reservation retrieval failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
},{
    params: t.Object({
        id: t.Number()
    })
})

reserve.get('/getByRoomId/:id', async({ params: { id } }) => {
    try {
        const result = await reserveController.getReservationsByRoomId({ roomId: id });
        return { success: true, message: "Reservations retrieved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Reservation retrieval failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
},{
    params: t.Object({
        id: t.Number()
    })
})