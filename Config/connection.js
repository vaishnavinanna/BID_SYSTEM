const mongoose = require('mongoose');
require('@dotenvx/dotenvx').config({ path: '../.env' });

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI; 
    const dbName = process.env.DBNAME; 
  
    await mongoose.connect(url,{
      dbName:dbName,
      maxPoolSize:10
    });
    console.log('Connected to MongoDB successfully using Mongoose');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

module.exports = { connectDB };
