import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/green_atelier';

// Singleton cache để tránh duplicate connections trong Serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (err) {
      cached.promise = null;
      return null;
    }
  }

  if (!MONGODB_URI) {
    return null;
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 2000,
  };

  try {
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      cached.conn = mongooseInstance;
      return mongooseInstance;
    });

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.warn('MongoDB connection unavailable:', err.message);
    return null;
  }
}

export default dbConnect;
