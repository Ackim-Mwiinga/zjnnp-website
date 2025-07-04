require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');

// Routes
const userRoutes = require('./routes/userRoutes');
const manuscriptRoutes = require('./routes/manuscriptRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const articleRoutes = require('./routes/articleRoutes');
const editorialBoardRoutes = require('./routes/editorialBoardRoutes');
const staticContentRoutes = require('./routes/staticContentRoutes');
const pageRoutes = require('./routes/pageRoutes');

// Security Config
const securityConfig = require('./config/security');

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Security middleware
app.use(helmet(securityConfig.helmet));
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', rateLimit(securityConfig.rateLimit.api));
app.use('/api/upload', rateLimit(securityConfig.rateLimit.upload));
app.use('/api/auth/login', rateLimit(securityConfig.rateLimit.login));

// CSRF protection
const csrfProtection = csrf(securityConfig.csrf);
app.use('/api', csrfProtection);

// JSON body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/zjnnp';
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log(`Connected to MongoDB at ${dbUri}`);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/manuscripts', manuscriptRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/editorialBoard', editorialBoardRoutes);
app.use('/api/staticContent', staticContentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/cases', require('./routes/caseRoutes'));
app.use('/api/waitlist', require('./routes/waitlistRoutes'));

// Error handling
app.use(require('./middleware/errorHandler'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
