/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
};
