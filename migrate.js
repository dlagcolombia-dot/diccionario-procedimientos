const fs = require('fs');
const path = require('path');
const { connectDB, getDB, closeDB } = require('./db');

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de datos a MongoDB...');
    
    await connectDB();
    const db = getDB();
    
    const modulos = ['actas', 'manuales', 'procedimientos'];
    
    for (const modulo of modulos) {
      const jsonFile = path.join(__dirname, 'data', `${modulo}.json`);
      
      if (!fs.existsSync(jsonFile)) {
        console.log(`⚠️  No existe ${modulo}.json, saltando...`);
        continue;
      }
      
      const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      
      if (data.length === 0) {
        console.log(`📭 ${modulo}.json está vacío, saltando...`);
        continue;
      }
      
      const collection = db.collection(modulo);
      
      // Limpiar colección existente
      await collection.deleteMany({});
      
      // Insertar datos
      await collection.insertMany(data);
      
      console.log(`✅ Migrados ${data.length} documentos a ${modulo}`);
    }
    
    console.log('🎉 Migración completada exitosamente!');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la migración:', error);
    process.exit(1);
  }
}

migrate();
