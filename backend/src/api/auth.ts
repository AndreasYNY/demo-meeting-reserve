import { Elysia, t } from 'elysia'
import { register, login } from '../controller/auth'
 
export const auth = new Elysia({ prefix: "/auth" })

// login
auth.post('/login', async({body}) => {
    try {
        const result = await login({ username: body.username, password: body.password });
        return { success: true, message: "Login successful", data: result };
    } catch (error) {
        return { success: false, message: "Login failed", error: (error instanceof Error ? error.message : "Unknown error") }
    }
}, {
    body: t.Object({
        username: t.String(),
        password: t.String()
    })
})

// register
auth.post('/register', async({ body }) => {
    try {
        const result = await register({ username: body.username, password: body.password, isAdmin: body.isAdmin?? false });
        return { success: true, message: "User registered successfully", data: result };
    } catch (error) {
        return { success: false, message: "Registration failed", error: (error instanceof Error ? error.message : "Unknown error") };
    }
}, {
    body: t.Object({
        username: t.String(),
        password: t.String(),
        isAdmin: t.Optional(t.Boolean())
    })
})