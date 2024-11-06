// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Define folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to avoid conflicts
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // Ensure the file is one of the acceptable types
//   const fileTypes = /geojson|kml|tiff|tif/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   if (extname ) {
//     return cb(null, true);
//   } else {
//     return cb(new Error('Only .geojson, .kml, .tiff files are allowed'), false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50MB
// });

// module.exports = upload;



const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const toGeoJSON = require('togeojson');
const { DOMParser } = require('xmldom');
const gdal = require('gdal');
const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload API
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  // Check the file extension to determine how to process it
  const ext = path.extname(req.file.originalname).toLowerCase();

  if (ext === '.kml') {
    // KML to GeoJSON
    const kmlData = fs.readFileSync(filePath, 'utf8');
    const doc = new DOMParser().parseFromString(kmlData, 'text/xml');
    const geojsonData = toGeoJSON.kml(doc);

    return res.status(200).json({
      message: 'KML file uploaded successfully',
      geojson: geojsonData
    });
  }

  if (ext === '.tif' || ext === '.tiff') {
    // TIFF to GeoJSON
    const dataset = gdal.open(filePath);
    const geojsonData = dataset.layers.get(0).toGeoJSON();

    return res.status(200).json({
      message: 'TIFF file uploaded successfully',
      geojson: geojsonData
    });
  }

  if (ext === '.geojson') {
    // Handle GeoJSON directly
    const geojsonData = fs.readFileSync(filePath, 'utf8');
    return res.status(200).json({
      message: 'GeoJSON file uploaded successfully',
      geojson: JSON.parse(geojsonData)
    });
  }

  // Unsupported file type
  return res.status(400).json({ error: 'Unsupported file type' });
});

module.exports = router;
