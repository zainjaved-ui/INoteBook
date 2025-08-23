const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;

connectToMongo();

app.use(cors());

// Middleware to parse JSON (useful later for APIs)
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/note'));

// Start server

// Start server
app.listen(port,() => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});

