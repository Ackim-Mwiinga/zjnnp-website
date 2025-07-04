const mongoose = require('mongoose');

const editorialBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: String // Store the path to the uploaded image
  }
});

const EditorialBoard = mongoose.model('EditorialBoard', editorialBoardSchema);

module.exports = EditorialBoard;
