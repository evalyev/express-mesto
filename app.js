const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const apiAuth = require('./middlewares/api-auth');

const {createUser, login} = require('./controllers/users');

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
}).then(res => {
  console.log("ПОДКЛЮЧИЛИСЬ К БД")
}).catch(res => {
  console.log("Ошибка: " + res.message)
})

app.post('/signin', login);
app.post('/signup', createUser); 

app.use(auth);

app.use('/users', apiAuth, require('./routes/users'));
app.use('/cards', apiAuth, require('./routes/cards'));


// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});