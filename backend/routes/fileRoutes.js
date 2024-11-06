const express = require('express');
const upload = require('../middleware/upload');  // Path to your upload.js
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/file/:filename', (req, res) => {
  const { filename } = req.params;
  console.log({filename})
  const filePath = path.join(__dirname, '../uploads', filename); 
  console.log({filePath})
  // Check if the file exists before sending it
  fs.exists(filePath, (exists) => {
    if (!exists) {
      
      return res.status(404).json({ error: 'File not found' });
    }

    // Send the file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
});

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
    filePath: req.file.filename,
  });
});

module.exports = router;
