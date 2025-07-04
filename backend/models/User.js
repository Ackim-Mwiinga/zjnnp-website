const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Auth Info
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  passwordHistory: [{ type: String }],
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  loginAttempts: {
    count: { type: Number, default: 0 },
    lockedUntil: { type: Date }
  },
  lastLogin: { type: Date },
  lastFailedLogin: { type: Date },
  
  // Profile Completion Status
  isProfileComplete: { type: Boolean, default: false },
  
  // Role Information
  role: { 
    type: String, 
    enum: ['author', 'reviewer', 'editor', 'publisher', 'admin'],
    default: null,
    required: false
  },
  
  // Role-specific fields
  authorProfile: {
    type: {
      personalInfo: {
        fullName: { 
          type: String, 
          required: [true, 'Full name is required for authors'],
          trim: true
        },
        title: { 
          type: String,
          trim: true
        },
        gender: { 
          type: String,
          enum: ['male', 'female', 'other', 'prefer_not_to_say']
        },
        dateOfBirth: { 
          type: Date,
          validate: {
            validator: function(v) {
              return v <= new Date();
            },
            message: 'Date of birth must be in the past'
          }
        }
      },
      contactInfo: {
        primaryEmail: { 
          type: String,
          required: [true, 'Primary email is required for authors'],
          trim: true,
          validate: {
            validator: function(v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
          }
        },
        alternativeEmail: { 
          type: String,
          trim: true,
          validate: {
            validator: function(v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
          }
        },
        phoneNumber: { 
          type: String,
          trim: true
        }
      },
      affiliation: {
        currentPosition: { 
          type: String,
          required: [true, 'Current position is required for authors'],
          trim: true
        },
        institution: { 
          type: String,
          required: [true, 'Institution is required for authors'],
          trim: true
        },
        department: { 
          type: String,
          trim: true
        },
        country: { 
          type: String,
          required: [true, 'Country is required for authors'],
          trim: true
        },
        institutionalAddress: { 
          type: String,
          trim: true
        }
      },
      academicInfo: {
        degrees: { 
          type: String,
          trim: true
        },
        orcid: { 
          type: String,
          trim: true,
          validate: {
            validator: function(v) {
              return /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(v);
            },
            message: props => `${props.value} is not a valid ORCID`
          }
        },
        scopusId: { 
          type: String,
          trim: true
        }
      }
    },
    required: function() {
      return this.role === 'author';
    }
  },
  
  // Editor-specific fields
  editorProfile: {
    type: {
      specialization: { type: String, trim: true },
      experienceYears: { type: Number, min: 0 },
      publications: [{
        title: String,
        journal: String,
        year: Number,
        doi: String
      }]
    },
    required: function() {
      return this.role === 'editor';
    }
  },
  
  // Reviewer-specific fields
  reviewerProfile: {
    type: {
      expertiseAreas: [String],
      reviewHistory: [{
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
        rating: { type: Number, min: 1, max: 5 },
        comments: String,
        reviewedAt: Date
      }],
      averageRating: { type: Number, min: 1, max: 5 }
    },
    required: function() {
      return this.role === 'reviewer';
    }
  },
  
  // Admin-specific fields
  adminProfile: {
    type: {
      department: String,
      permissions: {
        canManageUsers: Boolean,
        canManageRoles: Boolean,
        canManageArticles: Boolean,
        canManageReviews: Boolean
      }
    },
    required: function() {
      return this.role === 'admin';
    }
  },
  compliance: {
    agreeToDiscloseConflicts: { type: Boolean },
    willComplyWithEthics: { type: Boolean },
    acceptJournalPolicies: { type: Boolean }
  },
  preferences: {
    willingToBeReviewer: { type: Boolean },
    receiveEditorialUpdates: { type: Boolean }
  },
  googleScholar: { type: String },
  areasOfExpertise: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
