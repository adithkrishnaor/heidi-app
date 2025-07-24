// Temporary script to clear the User collection and reset schema
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://adthkrshna:1ejbRcSUICH9Cunj@cluster0.mhcrg7h.mongodb.net/heidi-app?retryWrites=true&w=majority&appName=Cluster0';

async function clearUserCollection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Drop the entire User collection to clear old schema
    await mongoose.connection.db.collection('users').drop();
    console.log('User collection dropped successfully');
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    if (error.message.includes('ns not found')) {
      console.log('Collection does not exist - that\'s fine');
    } else {
      console.error('Error:', error);
    }
    await mongoose.disconnect();
  }
}

clearUserCollection();
