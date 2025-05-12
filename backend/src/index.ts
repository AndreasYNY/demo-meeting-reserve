import { Elysia } from 'elysia'
import node from '@elysiajs/node'
import { auth } from './api/auth'
import { cors } from '@elysiajs/cors'
import { migration } from './api/database'
import { room } from './api/room'
import { reserve } from './api/reserve'
import { env } from './env'

const app = new Elysia({ adapter: node() })
  // running out of time this, will do
  .use(cors({
    origin: env.ORIGINS,
  }))
  .use(auth)
  .use(room)
  .use(migration)
  .use(reserve)
  .listen(3300, ({ hostname, port }) => {
    console.log(`Running on ${hostname}:${port}`)
})


export type App = typeof app