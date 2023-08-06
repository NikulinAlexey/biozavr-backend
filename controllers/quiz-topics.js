const QuizTopic = require('../models/quizTopic');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');

const getQuizTopics = (req, res, next) => {
  QuizTopic.find({})
    .then((quizTopics) => {
      res
        .send(quizTopics);
    })
    .catch(next);
};

const createQuizeTopic = (req, res, next) => {
  const {
    title,
    questions,
  } = req.body;
  const owner = req.user._id;

  QuizTopic.create({
    title,
    owner,
    questions,
  })
    .orFail(() => new ConflictError('Темы для квиза не должны повторяться'))
    .then((quizTopic) => {
      res
        .send(quizTopic);
    })
    .catch(next);
};

const deleteQuizeTopic = (req, res, next) => {
  const { quizTopicId } = req.params;
  const userId = req.user._id;

  QuizTopic.findById(quizTopicId)
    .orFail(() => new NotFoundError('Тема квиза не найдена'))
    .then((quizTopic) => {
      const owner = quizTopic.owner.toString();

      if (owner !== userId) {
        throw new ForbiddenError('Можно удалить только свою тему квиза');
      } else {
        quizTopic.deleteOne()
          .then(() => {
            res
              .send(quizTopic);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getQuizTopics,
  createQuizeTopic,
  deleteQuizeTopic,
};
