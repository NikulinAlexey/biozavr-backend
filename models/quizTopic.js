const mongoose = require('mongoose');

const quizTopicSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    unique: true,
    required: true,
  },
  questions: {
    type: mongoose.Schema.Types.Array,
    default: [],
    ref: 'quiz-question',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('quizTopic', quizTopicSchema);
