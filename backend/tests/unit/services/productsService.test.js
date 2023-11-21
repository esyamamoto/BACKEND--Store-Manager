/* const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

describe('Service de Produtos', function () {
  it('deve chamar o model para obter um produto específico', async function () {
    const noProducts = { id: 1, name: 'Martelo de Thor' };

    sinon.stub(productsModel, 'getProductById').resolves(noProducts);

    const product = await productsService.getProductById(1);

    expect(product).to.deep.equal(noProducts);

    productsModel.getProductById.restore();
  });
});
*/