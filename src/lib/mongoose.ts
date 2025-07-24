import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Create a properly typed global reference
const globalForMongoose = globalThis as unknown as {
  mongooseCache: CachedConnection | undefined;
};

// Initialize the cache
const cached: CachedConnection = globalForMongoose.mongooseCache || { conn: null, promise: null };

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('📁 Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🔌 Creating new MongoDB connection...');
    
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Connected to MongoDB successfully');
    return cached.conn;
  } catch (error: unknown) {
    console.error('❌ MongoDB connection error:', error);
    cached.promise = null;
    
    // Type guard to handle the error properly
    if (error instanceof Error) {
      throw new Error(`MongoDB connection failed: ${error.message}`);
    } else {
      throw new Error('MongoDB connection failed: Unknown error');
    }
  }
}

export default connectToDatabase;