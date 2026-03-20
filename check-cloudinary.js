const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'deb471c7g',
  api_key: '779756674255571',
  api_secret: 'Tzo9FmvfsQL0eENqRfn-g8q4Apc'
});

async function checkCloudinary() {
  try {
    console.log('\n  VERIFICANDO CLOUDINARY:\n');
    
    // Listar archivos en la carpeta diccionario
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'diccionario/',
      resource_type: 'image',
      max_results: 50
    });
    
    console.log(`Total de archivos: ${result.resources.length}\n`);
    
    result.resources.forEach(file => {
      console.log(`✅ ${file.public_id}`);
      console.log(`   URL: ${file.secure_url}`);
      console.log(`   Tamaño: ${(file.bytes / 1024).toFixed(2)} KB\n`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkCloudinary();
