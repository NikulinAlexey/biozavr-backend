const express = require('express');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const router = require('./routes');

// const errorHandler = require('./middlewares/error');
// const NotFoundError = require('./errors/not-found-error');

const { PORT = 3001 } = process.env;
const app = express();

// mongoose.connect('mongodb://0.0.0.0:27017/biozavr')
//   .then(() => {
//     console.log('Подключился к БД :)');
//   })
//   .catch(() => {
//     console.log('Ошибка при подключении к БД :(');
//   });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(router);

// app.use((req, res, next) => {
//   next(new NotFoundError('Страница не найдена'));
// });
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`слушаю ${PORT} порт`);
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Привет с бекенда Biozavra'
  })
});