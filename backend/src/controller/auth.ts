import { db } from "../kysely/database"
import bcrypt from 'bcrypt'
import { User } from "../kysely/types"
import * as jose from 'jose'
import { usernameAvailCheck } from "./user"

export async function register({username, password, isAdmin}: {username: string, password: string, isAdmin: boolean}) {
    const usernameCheck = await usernameAvailCheck({username})
    if (!usernameCheck) {
        throw new Error("Username is already taken")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return await db.insertInto('users').values({
        username,
        password: hashedPassword,
        isAdmin: isAdmin
    }).returning('id').execute()
}

export async function login({username, password}: {username: string, password: string}) {
    const user: User[] = await db.selectFrom('users')
        .select(['username', 'password', 'id', 'isAdmin'])
        .where('users.username', '=', username)
        .execute()
    if (user.length === 0) {
        throw new Error("User not found")
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password)
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
    const token = await new jose.SignJWT({ id: user[0].id, username: user[0].username, isAdmin: user[0].isAdmin })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(new Date())
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.HASH))
    return {token}
}
