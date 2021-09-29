const User = require('../models/user');
const bctypt = require('bcryptjs');

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
  const {email, password, name, about, avatar} = req.body;

  bctypt.hash(password, 10)
    .then(hash => User.create({email, password: hash, name, about, avatar}))
    .then(user => res.send({data: user}) )
    .catch(err => checkError(err, req, res));
};

module.exports.updateProfile = (req, res) => {
  const {name, about} = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then(user => checkQueryOfNull(user, req, res) )
    .catch(err => checkError(err, req, res));
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;

  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    .then(user => checkQueryOfNull(user, req, res) )
    .catch(err => checkError(err, req, res));
}