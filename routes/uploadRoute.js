// uploadRoute.js

const express = require('express');
const multer = require('multer');
const storage = require('../services/storage');

const router = express.Router();
const bucket = storage.bucket(process.env.BUCKET_NAME);

const upload = multer();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Check if a file was provided in the request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const file = req.file;
    const filename = Date.now() + '-' + file.originalname;

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    // Handle errors during the upload process
    blobStream.on('error', (err) => {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    });

    // Handle successful upload
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filename}`;
      console.log('File uploaded successfully:', publicUrl);
      res.status(200).json({ message: 'File uploaded successfully!', url: publicUrl });
    });

    // Pipe the file data to the blob stream
    blobStream.end(file.buffer);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

module.exports = router;
