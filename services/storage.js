const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

module.exports = storage;
