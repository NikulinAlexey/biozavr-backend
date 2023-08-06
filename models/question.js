const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    minlength: 2,
  },
  explanation: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
    minlength: 2,
  },
  line: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2,
  },
  mainText: {
    type: String,
    required: true,
    minlength: 2,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  subText: {
    type: String,
    required: true,
    minlength: 2,
  },
  theme: {
    type: String,
    required: true,
    minlength: 2,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('question', questionSchema);
