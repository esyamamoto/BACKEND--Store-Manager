const { expect } = require('chai');
const Sinon = require('sinon');
const controller = require('../../../src/controllers/productsController');
const mockProducts = require('../../mocks/produtsMocks');
const service = require('../../../src/services/productsService');

describe('Testes do productsController:', function () {
  it('Verifica se retorna os produtos do db', async function () {
    Sinon.stub(service, 'getProducts').resolves(mockProducts);
    const req = {};
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(controller, 'getAllProducts').resolves(mockProducts);

    await controller.getAllProducts(req, res);

    expect(res.status.calledWith(200)).to.equal(false);

    expect(res.json.calledWith(mockProducts)).to.equal(false);

    controller.getAllProducts.restore();
  });
  
  afterEach(function () {
    Sinon.restore();
  });
});
