import { Elysia, t, Cookie } from "elysia";
import * as roomController from "../controller/room";
import { decodeJwt } from "jose";

export const room = new Elysia({ prefix: "/room" })

room.post('/create', async({ body }) => {
    try {
        const result = await roomController.createRoom({ name: body.name });
        return { success: true, message: "Room created successfully", data: result };
    } catch (error) {
        return { success: false, message: "Room creation failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    body: t.Object({
        name: t.String()
    })
})

room.delete('/delete/:id', async({ params: { id } }) => {
    try {
        const result = await roomController.deleteRoom({ roomId: id });
        return { success: true, message: "Room deleted successfully" };
    } catch (error) {
        return { success: false, message: "Room deletion failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    params: t.Object({
        id: t.Number()
    })
})

room.get('/get/:id', async({ params: { id } }) => {
    try {
        const result = await roomController.getRoom({ roomId: id });
        return { success: true, message: "Room retrieved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Room retrieval failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    params: t.Object({
        id: t.Number()
    })
})

room.get('/getAll', async() => {
    try {
        const result = await roomController.getRooms();
        return { success: true, message: "Rooms retrieved successfully", data: result };
    } catch (error) {
        return { success: false, message: "Room retrieval failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
})