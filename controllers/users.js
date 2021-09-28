const User = require('../models/user');

const {checkError, checkQueryOfNull} = require('../middlewares/checkError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => checkQueryOfNull(users, req, res) )
    .catch(err => checkError(err, req, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => checkQueryOfNull(user, req, res) )
    .catch(err => checkError(err, req, res));
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}) )
    .catch(err => checkError(err, req, res));
};

module.exports.updateProfile = (req, res) => {
  const {name, about} = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about})
    .then(user => checkQueryOfNull(user, req, res) )
    .catch(err => checkError(err, req, res));
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;

  User.findByIdAndUpdate(req.user._id, {avatar})
    .then(user => checkQueryOfNull(user, req, res) )
    .catch(err => checkError(err, req, res));
}