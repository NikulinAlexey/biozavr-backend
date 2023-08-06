const { celebrate, Joi } = require('celebrate');

// Валидация запросов для users:
const validateGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).required().max(30),
    name: Joi.string().required().min(2).max(30),
  }),
});
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar:
      Joi.string()
        .required()
        .regex(/^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/)
        .message('Невалидная ссылка на аватар'),
  }),
});

// Валидация запросов для questions:
const validateCreateQuestion = celebrate({
  body: Joi.object().keys({
    answer:
      Joi.string()
        .required()
        .min(2),
    explanation:
      Joi.string()
        .required()
        .min(2),
    image:
      Joi.string()
        .required(),
    instruction:
      Joi.string()
        .required()
        .min(2),
    line:
      Joi.string()
        .required()
        .min(1)
        .max(2),
    mainText:
      Joi.string()
        .required()
        .min(2),
    source:
      Joi.string()
        .required()
        .min(2),
    subText:
      Joi.string()
        .required()
        .min(2),
    theme:
      Joi.string()
        .required()
        .min(2),
  }),
});
const validateDeleteQuestion = celebrate({
  params: Joi.object().keys({
    questionId: Joi.string().required().hex().length(24),
  }),
});

// Валидация запросов для авторизации, создания пользователя:
const validateСreateUser = celebrate({
  body: Joi.object().keys({
    name:
      Joi.string()
        .min(2)
        .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    email:
      Joi.string()
        .required()
        .email()
        .message('Поле "email" должно быть валидным email-адресом')
        .messages({
          'string.required': 'Поле "email" должно быть заполнено',
        }),
    avatar:
      Joi.string()
        .regex(/^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/)
        .message('Невалидная ссылка на аватар'),
    password:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Поле "password" должно быть заполнено2',
        }),
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email:
      Joi.string()
        .required()
        .email()
        .message('Поле "email" должно быть валидным email-адресом')
        .messages({
          'string.required': 'Поле "email" должно быть заполнено',
        }),
    password:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Поле "password" должно быть заполнено2',
        }),
  }),
});

const validateCreateQuizTopic = celebrate({
  body: Joi.object().keys({
    title:
      Joi.string()
        .required()
        .min(2),
    questions:
      Joi.array()
        .items(
          Joi.object({
            question: Joi.string(),
            image: Joi.string(),
          }),
        ),
  }),
});

const validateDeleteQuizTopic = celebrate({
  params: Joi.object().keys({
    quizTopicId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  // Валидация запросов для /users:
  validateGetUserById,
  validateUpdateProfile,
  validateUpdateAvatar,
  // Валидация запросов для /questions:
  validateCreateQuestion,
  validateDeleteQuestion,
  // Валидация запросов для авторизации, создания пользователя:
  validateСreateUser,
  validateLogin,
  // Валидация запросов для /quiz-topics:
  validateCreateQuizTopic,
  validateDeleteQuizTopic,
};
