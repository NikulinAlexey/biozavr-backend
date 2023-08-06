const router = require('express').Router();

const {
  validateCreateQuestion,
  validateDeleteQuestion,
} = require('../validation-constatns/validation-constatns');

const {
  getQuestions,
  deleteQuestion,
  createQuestion,
} = require('../controllers/questions');

router.get('', getQuestions);
router.post('', validateCreateQuestion, createQuestion);
router.delete('/:questionId', validateDeleteQuestion, deleteQuestion);

module.exports = router;
