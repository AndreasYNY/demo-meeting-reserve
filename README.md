# interviewProject
 
This project is a demo full stack app for reserving a meeting room.

This is built using:
- Bun
- ElysiaJs
- Drizzle ORM
- PostgreSQL
- Nuxt.js
- Shadcn/ui

## Getting Started

### Running
I recommend using my docker-compose file to run everything. or please do visit [the live demo](https://demomeeting.diff.my.id).

It's as simple as running:
```bash
docker-compose up
```

### Running manually
1. Make sure you have:
    - PostgreSQL
    - Node.js
    - Bun
2. Install the dependencies:
```bash
bun install
```
### frontend
1. Go to the frontend directory:
```bash
cd frontendnuxt
```
2. Install the dependencies:
```bash
bun install
```
3. add the .env file
```bash
NUXT_PUBLIC_API_URL=http://localhost:3000 # set the api url
```
4. Run the development server:
```bash
bun run preview
```

### backend
1. Go to the backend directory:
```bash
cd backend
```
2. Install the dependencies:
```bash
bun install
```

3. add the .env file
```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432
HASH=sha256
```

4. Run the development server:
```bash
bun run dev
```

5. Run migrations:
Since this is a demo project, I want to be able to periodically reset the database and run the migrations again. So I created an endpoint to do that.
```bash
curl -X POST http://localhost:3000/migratetion/up #migrate
curl -X POST http://localhost:3000/migratetion/down #drop all tables
```