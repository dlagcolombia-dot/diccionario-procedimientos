const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'deb471c7g',
  api_key: process.env.CLOUDINARY_API_KEY || '779756674255571',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Tzo9FmvfsQL0eENqRfn-g8q4Apc'
});

module.exports = cloudinary;
