const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Define the upload route
app.post('/upload', upload.single('file'), (req, res) => {
  console.log({req, res})
  if (req.file) {
    res.json(`File uploaded: ${req.file.originalname}`);
    console.log({res})
  } 
  // else {
  //   res.status(400).send('File not uploaded.');
  // }
});

// Add a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Geo-Data API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
