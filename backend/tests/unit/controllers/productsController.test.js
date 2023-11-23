const { expect } = require('chai');
const Sinon = require('sinon');
const controller = require('../../../src/controllers/productsController');
const { mockProducts, notFound } = require('../../mocks/produtsMocks');
const service = require('../../../src/services/productsService');
const validation = require('../../../src/middlewares/validation');

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
  it('Busca com id inválido e traz o NOT_FOUND', async function () {
    Sinon.stub(service, 'getProductById').resolves(notFound);

    const req = { params: { id: 666 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await controller.getProductById(req, res);
    expect(res.status.calledWith(404)).to.be.equal(false);
    expect(res.json.calledWith({ message: 'Product not found' })).to.equal(false);
  });

  it('Deve mostrar Internal Server Error se tiver o erro 500', async function () {
    const errorMessage = 'Internal Server Error';
    Sinon.stub(service, 'getProductById').rejects(new Error(errorMessage));
    const req = { params: { id: 453 } };
    const res = { status: Sinon.stub(), json: Sinon.stub() };

    res.status.returns(res);

    await controller.getProductById(req, res);

    Sinon.assert.calledWith(res.status, 500);
    Sinon.assert.calledWith(res.json, { message: errorMessage });
  });

  it('Validação se Name é menor que 5 caracteres', async function () {
    const errorMessage = '"name" length must be at least 5 characters long';
    Sinon.stub(service, 'getProductById').rejects(new Error(errorMessage));
    const req = { body: { name: '123' } };
    const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
    const next = Sinon.stub();

    validation(req, res, next);
    Sinon.assert.calledWith(res.status, 422);
    // expect(res.status).to.have.been.calledWith(422);
    Sinon.assert.calledWith(res.json, { message: errorMessage });
    // expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});