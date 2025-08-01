const express = require('express');
const dotenv = require('dotenv');
const app = require('./app'); 
const connectDB = require('./config/db');
dotenv.config({ path: './.env' });
connectDB();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  
  server.close(() => process.exit(1));
});