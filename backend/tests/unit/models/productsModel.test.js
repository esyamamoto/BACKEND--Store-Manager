const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connectionDB = require('../../../src/models/db');

describe('Model de Produtos', function () {
  describe('getProducts', function () {
    it('deve retornar uma lista de produtos', async function () {
      const noProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(connectionDB, 'execute').resolves([noProducts]);

      const products = await productsModel.getProducts();

      expect(products).to.deep.equal(noProducts);

      connectionDB.execute.restore();
    });
  });

  describe('getProductById', function () {
    it('deve retornar um produto específico', async function () {
      const noProduct = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(connectionDB, 'execute').resolves([[noProduct]]);

      const product = await productsModel.getProductById(1);

      expect(product).to.deep.equal(noProduct);

      connectionDB.execute.restore();
    });
  });
});
