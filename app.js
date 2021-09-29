const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const {createUser, login} = require('../controllers/users');

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
}).then(res => {
  console.log("ПОДКЛЮЧИЛИСЬ К БД")
}).catch(res => {
  console.log("Ошибка: " + res.message)
})

app.use((req, res, next) => {
  req.user = {
    _id: '6153425b4b8ee76a1e903416' // вставьте сюда _id пользователя
  };

  next();
}); 

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.post('/signin', login);
app.post('/signup', createUser); 


// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});