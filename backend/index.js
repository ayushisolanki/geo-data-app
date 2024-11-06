const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
// const upload = multer({ dest: 'uploads/' });
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('GEO DATA APP hello world');
});


// test API route
app.get("/api/message", (req, res) => {
  res.json({ message: "GEO DATA: message from backend" });
});

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
