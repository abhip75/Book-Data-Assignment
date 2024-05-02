
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.use('/books', bookRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
