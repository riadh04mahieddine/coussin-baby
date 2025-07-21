import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coussinbaby';

if (!MONGODB_URI) {
  throw new Error(
    'Veuillez définir la variable d\'environnement MONGODB_URI dans votre .env.local'
  );
}

/**
 * Global est utilisé ici pour maintenir une connexion à la base de données
 * à travers les rechargements à chaud en développement et pour éviter
 * les connexions multiples en production.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log('Utilisation de la connexion MongoDB existante');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Tentative de connexion à MongoDB Atlas...');
    console.log('URI MongoDB (masquée):', MONGODB_URI.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@'));
    
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 secondes timeout
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connexion MongoDB Atlas réussie');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion MongoDB Atlas:', error.message);
        if (error.message.includes('IP')) {
          console.error('💡 Solution: Ajoutez votre IP à la whitelist MongoDB Atlas');
          console.error('💡 Ou autorisez toutes les IPs avec 0.0.0.0/0 pour le développement');
        }
        throw error;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Reset la promesse en cas d'erreur pour permettre une nouvelle tentative
    cached.promise = null;
    throw error;
  }
}

export default connectToDatabase;
