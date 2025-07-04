const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

router.post('/', verifyJWT, checkRole('writer'), submissionController.createSubmission);
router.get('/', verifyJWT, checkRole('editor'), submissionController.getSubmissions);
router.put('/:id/approve', verifyJWT, checkRole('editor'), submissionController.approveSubmission);

module.exports = router;
