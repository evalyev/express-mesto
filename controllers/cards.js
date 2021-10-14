const Card = require('../models/card');

const { checkQueryOfNull } = require('../middlewares/checkError');
const { checkPermissionsCard } = require('../middlewares/checkPermissions');

const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length !== 0) {
        res.send({ data: cards });
      } else {
        res.send({ data: null });
      }
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('Card not found'));
      }
      if (!checkPermissionsCard(card, req.user)) {
        return Promise.reject(new ForbiddenError('Forbidden error'));
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => checkQueryOfNull(card, req, res, next))
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => checkQueryOfNull(card, req, res, next))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => checkQueryOfNull(card, req, res, next))
    .catch((err) => next(err));
};
