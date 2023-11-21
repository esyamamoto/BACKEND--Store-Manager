const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

describe('Service de Produtos', function () {
  describe('getProducts', function () {
    it('deve chamar o model para obter a lista de produtos', async function () {
      const noProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(productsModel, 'getProducts').resolves(noProducts);

      const products = await productsService.getProducts();

      expect(products).to.deep.equal(noProducts);

      productsModel.getProducts.restore();
    });
  });

  describe('getProductById', function () {
    it('deve chamar o model para obter um produto específico', async function () {
      const noProducts = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(productsModel, 'getProductById').resolves(noProducts);

      const product = await productsService.getProductById(1);

      expect(product).to.deep.equal(noProducts);

      productsModel.getProductById.restore();
    });
  });
});
