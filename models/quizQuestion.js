const mongoose = require('mongoose');

function isRegExValid(v) {
  return /^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/.test(v);
}
const imageValidator = [isRegExValid, 'Ссылка на картинку невалидна'];

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  image: {
    type: String,
    validate: imageValidator,
    default: '',
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

module.exports = mongoose.model('quiz-question', quizQuestionSchema);
