const storageService = require('../services/storageService');

async function uploadFile(req, res) {
    try {
        const file = req.file;
        const result = await storageService.uploadFileToGCS(file);
        res.status(200).json({ message: 'File uploaded successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
}

module.exports = {
    uploadFile
};
