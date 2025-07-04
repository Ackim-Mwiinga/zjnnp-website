const mongoose = require('mongoose');

const staticContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['Aims', 'Mission', 'Policies', 'Guidelines'],
    required: true
  }
});

const StaticContent = mongoose.model('StaticContent', staticContentSchema);

module.exports = StaticContent;
