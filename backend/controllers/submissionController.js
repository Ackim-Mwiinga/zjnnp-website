const Submission = require('../models/Submission');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file
  },
});

const upload = multer({ storage: storage });

const createSubmission = async (req, res) => {
  try {
    const { title, abstract, authors } = req.body;
    const userId = req.user.id;
    const manuscript = req.file; // Access the uploaded file

    if (!manuscript) {
      return res.status(400).json({ message: 'Manuscript file is required' });
    }

    const submission = new Submission({
      title,
      abstract,
      authors: JSON.parse(authors), // Parse the authors array
      user: userId,
      manuscript: manuscript.path, // Store the file path in the database
    });

    await submission.save();

    res.status(201).json({ message: 'Submission created successfully', submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create submission' });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) {
      query.status = status;
    }
    const submissions = await Submission.find(query).populate('user', 'username email');
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get submissions' });
  }
};

const approveSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const userId = req.user.id;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.status = 'approved';
    submission.editor = userId;
    submission.reviewedAt = Date.now();

    await submission.save();

    // Create a new article from the submission
    await createArticleFromSubmission(submission);

    res.status(200).json({ message: 'Submission approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve submission' });
  }
};

const createArticleFromSubmission = async (submission) => {
  const Article = require('../models/Article');

  try {
    const article = new Article({
      title: submission.title,
      content: submission.abstract, // Assuming abstract is the content
      author: submission.user,
      publishedAt: Date.now(),
      submissionRef: submission._id,
    });

    await article.save();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create article from submission');
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  approveSubmission,
  upload,
};
