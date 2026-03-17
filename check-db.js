const { connectDB, getDB, closeDB } = require('./db');

async function checkData() {
  try {
    await connectDB();
    const db = getDB();
    
    console.log('\n📊 DATOS EN MONGODB:\n');
    
    const modulos = ['actas', 'manuales', 'procedimientos'];
    
    for (const modulo of modulos) {
      const collection = db.collection(modulo);
      const count = await collection.countDocuments();
      const docs = await collection.find({}).toArray();
      
      console.log(`\n${modulo.toUpperCase()}: ${count} documentos`);
      docs.forEach(doc => {
        console.log(`  - ${doc.titulo} (${doc.fecha})`);
      });
    }
    
    await closeDB();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkData();
