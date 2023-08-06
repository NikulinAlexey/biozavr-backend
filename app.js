require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const router = require('./routes');

const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/biozavr')
  .then(() => {
    console.log('Подключился к БД :)');
  })
  .catch(() => {
    console.log('Ошибка при подключении к БД :(');
  });

app.use(cors({
  origin: ['https://nikulinalexey.github.io', 'http://localhost:3000'],
  // origin: ['https://nikulinalexey.github.io'],
  // origin: ['http://localhost:3000'],
  credentials: true,
}), router);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`слушаю ${PORT} порт`);
});
