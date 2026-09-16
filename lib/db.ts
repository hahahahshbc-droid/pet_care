import { Pool } from "pg";

declare global {
  var postgresPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("缺少 DATABASE_URL 环境变量");
  }

  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    // Supabase encrypts pooler traffic with TLS. The shared pooler's chain is
    // not trusted by Node in this local environment, so local verification is disabled.
    ssl: { rejectUnauthorized: false },
  });
}

export function getPool() {
  globalThis.postgresPool ??= createPool();
  return globalThis.postgresPool;
}
