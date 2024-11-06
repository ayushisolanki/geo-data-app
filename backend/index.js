const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
// const upload = multer({ dest: 'uploads/' });
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('GEO DATA APP hello world');
});


 // This saves uploaded files to an 'uploads' folder

// File upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) return res.status(400).send('No file uploaded');
  
//   // Send file metadata back as a response
//   res.json({
//     filename: req.file.filename,
//     originalName: req.file.originalname,
//     path: req.file.path,
//     mimeType: req.file.mimetype
//   });
// });

// Sample API route
app.get("/api/message", (req, res) => {
  res.json({ message: "GEO DATA: message from backend" });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
