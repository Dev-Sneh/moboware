const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const retrieveRoute = require('./routes/retrieveRoute');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/upload', uploadRoute);
app.use('/retrieve', retrieveRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
