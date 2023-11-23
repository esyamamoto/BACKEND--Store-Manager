const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
// reestruturação - mentoria
// Rota para listar todos os produtos
app.get('/products', productsController.getAllProducts);

// Rota para obter um produto por ID
app.get('/products/:id', productsController.getProductById);

// Rota para listar todos  sales
app.get('/sales', salesController.getAllSales);

// Rota para obter sales por ID
app.get('/sales/:id', salesController.getSalesById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
