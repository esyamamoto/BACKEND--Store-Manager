const express = require('express');
const productsController = require('./controllers/productsController');

const app = express();

// Rota para listar todos os produtos
app.get('/products', productsController.getAllProducts);

// Rota para obter um produto por ID
app.get('/products/:id', productsController.getProductById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
