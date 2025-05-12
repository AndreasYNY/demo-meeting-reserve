import 'dotenv/config'

class Env {
    public readonly DB_HOST: string;
    public readonly DB_USER: string;
    public readonly DB_PASSWORD: string;
    public readonly DB_PORT: number;
    public readonly ORIGINS: string;
    public readonly HASH: string;

    constructor() {
        const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_PORT'];
        const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

        if (missingEnvVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        }

        this.DB_HOST = process.env.DB_HOST!;
        this.DB_USER = process.env.DB_USER!;
        this.HASH = process.env.HASH!;
        this.DB_PASSWORD = process.env.DB_PASSWORD!;
        this.ORIGINS = process.env.ORIGINS || '*';
        this.DB_PORT = parseInt(process.env.DB_PORT!);
    }
}

export const env = new Env();