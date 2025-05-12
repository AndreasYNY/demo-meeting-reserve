import { db } from "../kysely/database"

export async function usernameAvailCheck({username}:  {username: string}) {
    const user = await db.selectFrom('users').where('users.username', '=', username).execute()
    return user.length > 0 ? false : true
} 