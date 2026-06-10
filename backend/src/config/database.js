const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://marialopezal205_db_user:dZQacIBNuZaGufl5@cluster0.stpe2yy.mongodb.net/?appName=Cluster0';
const DB_NAME = 'diccionario';

let client;
let db;

async function connectDB() {
  if (db) return db;
  
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Conectado a MongoDB Atlas');
    return db;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error('Base de datos no inicializada. Llama a connectDB() primero.');
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('🔌 Desconectado de MongoDB');
  }
}

module.exports = { connectDB, getDB, closeDB };
