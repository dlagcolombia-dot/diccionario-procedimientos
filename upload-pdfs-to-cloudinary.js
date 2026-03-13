const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { connectDB, getDB, closeDB } = require('./db');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'deb471c7g',
  api_key: process.env.CLOUDINARY_API_KEY || '779756674255571',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Tzo9FmvfsQL0eENqRfn-g8q4Apc'
});

const PDFS_DIR = path.join(__dirname, 'docs', 'pdfs');

async function uploadPDFsToCloudinary() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await connectDB();
    const db = getDB();
    
    const modulos = ['actas', 'manuales', 'procedimientos'];
    
    for (const modulo of modulos) {
      console.log(`\n📁 Procesando ${modulo}...`);
      const collection = db.collection(modulo);
      const docs = await collection.find({}).toArray();
      
      for (const doc of docs) {
        // Si ya tiene URL de Cloudinary, saltar
        if (doc.archivo && doc.archivo.includes('cloudinary.com')) {
          console.log(`✅ ${doc.titulo} - Ya está en Cloudinary`);
          continue;
        }
        
        // Construir ruta local del PDF
        const pdfPath = path.join(__dirname, 'docs', doc.archivo);
        
        if (!fs.existsSync(pdfPath)) {
          console.log(`⚠️  ${doc.titulo} - Archivo no encontrado: ${pdfPath}`);
          continue;
        }
        
        console.log(`📤 Subiendo ${doc.titulo}...`);
        
        try {
          // Subir a Cloudinary
          const result = await cloudinary.uploader.upload(pdfPath, {
            folder: `diccionario/${modulo}`,
            resource_type: 'image',
            public_id: path.basename(pdfPath, '.pdf'),
            format: 'pdf',
            access_mode: 'public',
            type: 'upload'
          });
          
          // Generar URL firmada
          const signedUrl = cloudinary.url(result.public_id, {
            resource_type: 'image',
            type: 'upload',
            sign_url: true,
            secure: true
          });
          
          // Actualizar en MongoDB
          await collection.updateOne(
            { id: doc.id },
            { 
              $set: { 
                archivo: signedUrl || result.secure_url,
                cloudinary_id: result.public_id
              } 
            }
          );
          
          console.log(`✅ ${doc.titulo} - Subido exitosamente`);
        } catch (error) {
          console.error(`❌ Error subiendo ${doc.titulo}:`, error.message);
        }
      }
    }
    
    console.log('\n🎉 Proceso completado!');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

uploadPDFsToCloudinary();
