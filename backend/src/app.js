// /backend/src/app.js

const express = require('express');
const cors = require('cors');

// --- Import Routes ---
const authRoutes = require('./api/routes/auth.routes');
const sessionRoutes = require('./api/routes/sessions.routes'); // <-- Import session routes


const app = express();



app.use(cors());

app.use(express.json());




app.use('/api/auth', authRoutes);


app.use('/api/sessions', sessionRoutes); // <-- Use session routes


app.get('/', (req, res) => {
  res.send('Wellness Platform API is alive!');
});



module.exports = app;
