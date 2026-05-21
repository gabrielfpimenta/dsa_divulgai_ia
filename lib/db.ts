import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
const dbPath = path.join(dataDir, 'divulgai.db')
export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  rating REAL NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  verified INTEGER NOT NULL DEFAULT 0,
  cover_image TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  FOREIGN KEY(provider_id) REFERENCES providers(id)
);
`)

const count = db.prepare('SELECT COUNT(*) as count FROM categories').get() as {count:number}
if (count.count === 0) {
  const seed = db.prepare('INSERT INTO categories (slug,name,icon) VALUES (@slug,@name,@icon)')
  const categories = [
    { slug: 'bolos-doces', name: 'Bolos e Doces', icon: 'Cake' },
    { slug: 'doces-sobremesas', name: 'Doces e Sobremesas', icon: 'IceCream' },
    { slug: 'salgados', name: 'Salgados', icon: 'Sandwich' },
    { slug: 'marmitas', name: 'Marmitas', icon: 'Utensils' },
    { slug: 'drinks-artesanais', name: 'Drinks Artesanais', icon: 'Martini' },
    { slug: 'cafe-bebidas', name: 'Café e Bebidas', icon: 'Coffee' },
    { slug: 'lanches', name: 'Lanches', icon: 'Pizza' },
    { slug: 'fitness', name: 'Fitness', icon: 'Heart' },
  ]
  const insertMany = db.transaction((items) => items.forEach((i: any) => seed.run(i)))
  insertMany(categories)
}
