const Card = require('../models/card');

const {checkError, checkQueryOfNull} = require('../middlewares/checkError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => checkQueryOfNull(cards, req, res) )
    .catch(err => checkError(err, req, res) );
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;

  Card.create({name, link, owner})
    .then(card => res.send({data: card}))
    .catch(err => checkError(err, req, res) );
}

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => checkQueryOfNull(card, req, res) )
    .catch(err => checkError(err, req, res) );
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => checkQueryOfNull(card, req, res) )
    .catch(err => checkError(err, req, res) );
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ) 
    .then(card => checkQueryOfNull(card, req, res) )
    .catch(err => checkError(err, req, res) );
}