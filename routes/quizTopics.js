const router = require('express').Router();

const {
  validateCreateQuizTopic,
  validateDeleteQuizTopic,
} = require('../validation-constatns/validation-constatns');

const {
  getQuizTopics,
  deleteQuizeTopic,
  createQuizeTopic,
} = require('../controllers/quiz-topics');

router.get('', getQuizTopics);
router.post('', validateCreateQuizTopic, createQuizeTopic);
router.delete('/:quizTopicId', validateDeleteQuizTopic, deleteQuizeTopic);

module.exports = router;
