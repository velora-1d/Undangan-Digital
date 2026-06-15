import Database from "better-sqlite3";
import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";

// 1. Check Environment
const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
const isNeon = DATABASE_URL && (DATABASE_URL.startsWith("postgres") || DATABASE_URL.startsWith("postgresql"));

// --- SQLITE SETUP ---
const DB_DIR = path.resolve(process.cwd(), "database");
const DB_FILE = path.join(DB_DIR, "wedding.db");

if (!isNeon && !fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// --- INITIALIZE ---
let sqliteDb: any = null;
let neonSql: any = null;

if (isNeon) {
  neonSql = neon(DATABASE_URL!);
  console.log("Using Neon DB (PostgreSQL)");
} else {
  sqliteDb = new Database(DB_FILE);
  sqliteDb.pragma("journal_mode = WAL");
  console.log("Using Local SQLite");
}

// --- UNIFIED INTERFACE (Async) ---
export const db = {
  async execute(query: string, params: any[] = []) {
    if (isNeon) {
      let i = 0;
      const pgQuery = query.replace(/\?/g, () => `$${++i}`);
      return await (neonSql as any).query(pgQuery, params);
    } else {
      return sqliteDb.prepare(query).run(...params);
    }
  },

  async query(query: string, params: any[] = []) {
    if (isNeon) {
      let i = 0;
      const pgQuery = query.replace(/\?/g, () => `$${++i}`);
      return await (neonSql as any).query(pgQuery, params);
    } else {
      return sqliteDb.prepare(query).all(...params);
    }
  },

  async queryOne(query: string, params: any[] = []) {
    if (isNeon) {
      let i = 0;
      const pgQuery = query.replace(/\?/g, () => `$${++i}`);
      const rows = await (neonSql as any).query(pgQuery, params);
      return rows[0];
    } else {
      return sqliteDb.prepare(query).get(...params);
    }
  }
};

// --- SYNC INIT ---
const initSql = `
  CREATE TABLE IF NOT EXISTS rsvps (
    id SERIAL PRIMARY KEY,
    guest_name TEXT NOT NULL,
    phone TEXT,
    attendance TEXT,
    guest_count INTEGER,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS wishes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

const initSqlSQLite = `
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    phone TEXT,
    attendance TEXT,
    guest_count INTEGER,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

if (isNeon) {
  // PostgreSQL migration: SERIAL instead of AUTOINCREMENT
  (async () => {
    try {
      // Split by semicolon and execute each statement
      const statements = initSql.split(';').filter(s => s.trim());
      for (const s of statements) {
        await (neonSql as any).query(s);
      }
      console.log("Neon DB Tables Initialized");
    } catch (err) {
      console.error("Failed to initialize Neon DB tables:", err);
    }
  })();
} else {
  sqliteDb.exec(initSqlSQLite);
}

export default db;
