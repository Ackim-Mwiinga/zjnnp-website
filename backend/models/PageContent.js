const mongoose = require('mongoose');

// Article model
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  image: { type: String },
  tags: [{ type: String }]
});

// Specialty model
const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false }
});

// Resource model
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String },
  icon: { type: String },
  dateAdded: { type: Date, default: Date.now }
});

// Competition model
const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  image: { type: String },
  requirements: { type: String },
  prizes: { type: String }
});

// Channel model
const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['public', 'private'], required: true },
  image: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  featured: { type: Boolean, default: false }
});

// Partner model
const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  since: { type: Date },
  featured: { type: Boolean, default: false }
});

// Team member model for About Us
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  linkedin: { type: String },
  twitter: { type: String }
});

// About Us content model
const aboutContentSchema = new mongoose.Schema({
  mission: { type: String, required: true },
  values: [{ type: String }],
  history: [{
    year: { type: Number },
    description: { type: String }
  }],
  team: [teamMemberSchema],
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    address: { type: String }
  }
});

// Export all models
module.exports = {
  Article: mongoose.model('Article', articleSchema),
  Specialty: mongoose.model('Specialty', specialtySchema),
  Resource: mongoose.model('Resource', resourceSchema),
  Competition: mongoose.model('Competition', competitionSchema),
  Channel: mongoose.model('Channel', channelSchema),
  Partner: mongoose.model('Partner', partnerSchema),
  AboutContent: mongoose.model('AboutContent', aboutContentSchema)
};
