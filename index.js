require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");
const path = require('path'); // Add this line to import the path module

connectToMongo();
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(express.json());
app.use(cors());

// Available Routes
app.use('/api/product', require('./routes/product'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(8000, () => {
  console.log(`app listening on port http://localhost:${8000}`);
});
