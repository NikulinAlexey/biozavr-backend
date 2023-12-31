const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации в катч'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
