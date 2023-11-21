const { expect } = require('chai'); // npm install supertest --save-dev
const sinon = require('sinon');
const supertest = require('supertest');

const app = require('../../../src/app');
const productsService = require('../../../src/services/productsService');

describe('Controller de Produtos', function () {
  describe('GET /products', function () {
    it('deve retornar uma lista de produtos com status 200', async function () {
      const noProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(productsService, 'getProducts').resolves(noProducts);

      const response = await supertest(app).get('/products');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(noProducts);

      productsService.getProducts.restore();
    });
  });

  describe('GET /products/:id', function () {
    it('deve retornar um produto específico com status 200', async function () {
      const noProducts = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(productsService, 'getProductById').resolves(noProducts);

      const response = await supertest(app).get('/products/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(noProducts);

      productsService.getProductById.restore();
    });
  });
});
