const express = require('express');
const mongoose = require('mongoose');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express(); 

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  gender: {
    type: String, // гендер — это строка
    enum: ['м', 'ж', 'другой'] // gender может принимать одно из трёх значений
  },
  about: String, // тип — String
}); 

app.get('/', (req, res) => {
  res.send(
        `<html>
        <body>
            <p>Ответ на сигнал из далёкого космоса</p>
        </body>
        </html>`
    );
}); 