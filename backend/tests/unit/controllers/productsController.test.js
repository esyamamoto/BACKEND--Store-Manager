/* const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const { productService } = require('../../../src/services/productsService');
const { productController } = require('../../../src/controllers/productsController');
const { productFromModelSuccess, product } = require('../../mocks/produtsMocks');

chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Testando findById retornado com SUCESSO', async function () {
    sinon.stub(productService, 'findById').resolves(productFromModelSuccess);

    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });
});
*/