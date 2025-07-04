const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('multer');
const path = require('path');

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new case (auth required)
router.post('/', verifyJWT, upload.single('files'), caseController.createCase);

// Get all cases (for chief editor dashboard)
router.get('/', verifyJWT, caseController.getAllCases);

module.exports = router;
