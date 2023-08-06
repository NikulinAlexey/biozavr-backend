const Question = require('../models/question');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getQuestions = (req, res, next) => {
  Question.find({})
    .then((questions) => {
      res
        .send(questions);
    })
    .catch(next);
};

const createQuestion = (req, res, next) => {
  const {
    line,
    image,
    theme,
    answer,
    source,
    subText,
    mainText,
    instruction,
    explanation,
  } = req.body;

  const owner = req.user._id;

  Question.create({
    line,
    owner,
    image,
    theme,
    answer,
    source,
    subText,
    mainText,
    instruction,
    explanation,
  })
    .then((question) => {
      res
        .send(question);
    })
    .catch(next);
};

const deleteQuestion = (req, res, next) => {
  const { questionId } = req.params;
  const userId = req.user._id;

  Question.findById(questionId)
    .orFail(() => new NotFoundError('Вопрос не найден'))
    .then((question) => {
      const owner = question.owner.toString();

      if (owner !== userId) {
        throw new ForbiddenError('Можно удалить только свой вопрос');
      } else {
        question.deleteOne()
          .then(() => {
            console.log('Вопрос удален');
            res
              .send(question);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getQuestions,
  deleteQuestion,
  createQuestion,
};
