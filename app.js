const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

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
    _id: '6153425b4b8ee76a1e903416' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
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

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});