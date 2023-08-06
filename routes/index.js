const router = require('express').Router();
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const questionsRouter = require('./questions');
const quizTopicsRouter = require('./quizTopics');

const { login, createUser } = require('../controllers/auth');
const { validateСreateUser, validateLogin } = require('../validation-constatns/validation-constatns');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

router.use(limiter);
router.use(express.json());
router.use(cookieParser());

router.use('/signin', validateLogin, login);
router.use('/signup', validateСreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/quiz-topics', quizTopicsRouter);

router.use(errors());

module.exports = router;
