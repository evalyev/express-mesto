/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.message === 'Incorrect email or password') {
    return res.status(401).send({ message: err.message });
  }
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
};
