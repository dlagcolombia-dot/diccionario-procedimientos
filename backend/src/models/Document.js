const { getDB } = require('../config/database');

class Document {
  static async findAll(modulo) {
    const db = getDB();
    const collection = db.collection(modulo);
    return await collection.find({}).toArray();
  }

  static async findById(modulo, id) {
    const db = getDB();
    const collection = db.collection(modulo);
    return await collection.findOne({ id: Number(id) });
  }

  static async create(modulo, doc) {
    const db = getDB();
    const collection = db.collection(modulo);
    await collection.insertOne(doc);
    return doc;
  }

  static async delete(modulo, id) {
    const db = getDB();
    const collection = db.collection(modulo);
    await collection.deleteOne({ id: Number(id) });
  }
}

module.exports = Document;
