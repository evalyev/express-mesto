const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { regexUrl } = require('../utils/constants');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), removeCard);

router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);

router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

module.exports = router;
