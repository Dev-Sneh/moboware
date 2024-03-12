const express = require('express');
const storage = require('../services/storage');

const router = express.Router();
const bucket = storage.bucket(process.env.BUCKET_NAME);

router.get('/images', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();

        const urls = files.map(file => {
            const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${file.name}`;
            return publicUrl;
        });

        res.status(200).json({ message: 'Retrieved all images successfully!', urls: urls });
    } catch (err) {
        console.error('Error retrieving images:', err);
        res.status(500).json({ error: 'Error retrieving images' });
    }
});

module.exports = router;
