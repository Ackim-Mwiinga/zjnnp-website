const mongoose = require('mongoose');

// Bookmark model
const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['resource', 'competition', 'channel'],
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Notification model
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'competition_new',
      'competition_updated',
      'channel_joined',
      'resource_added',
      'partner_added'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Search Tag model
const searchTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['specialty', 'resource', 'competition', 'channel', 'partner'],
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  relatedItems: [{
    itemId: mongoose.Schema.Types.ObjectId,
    score: Number
  }]
});

// Export models
module.exports = {
  Bookmark: mongoose.model('Bookmark', bookmarkSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  SearchTag: mongoose.model('SearchTag', searchTagSchema)
};
