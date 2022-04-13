require('dotenv/config');

const express = require('express');

const app = express();
const error = require('./middleware/error');

app.use(express.json());

app.use('/login', require('./routes/login'));

app.use('/user', require('./routes/users'));

app.use('/categories', require('./routes/category'));

app.use('/post', require('./routes/post'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
