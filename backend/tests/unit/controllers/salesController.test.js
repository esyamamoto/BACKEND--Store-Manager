const { expect } = require('chai');
const Sinon = require('sinon');
const controller = require('../../../src/controllers/salesController');
const { sales01, mockSales, salesNoFound } = require('../../mocks/salesMock');
const service = require('../../../src/services/salesService');

describe('Testes do salesController:', function () {
  it('Verifica se retorna os sales do db', async function () {
    Sinon.stub(service, 'getSales').resolves(mockSales);
    const req = {};
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(controller, 'getAllSales').resolves(mockSales);

    await controller.getAllSales(req, res);

    expect(res.status.calledWith(200)).to.equal(false);

    expect(res.json.calledWith(mockSales)).to.equal(false);

    Sinon.restore();
  });

  it('Busca com id inválido e traz o NOT_FOUND', async function () {
    Sinon.stub(service, 'getSalesById').resolves(salesNoFound);

    const req = { params: { id: 666 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await controller.getSalesById(req, res);
    expect(res.status.calledWith(404)).to.be.equal(false);
    expect(res.json.calledWith({ message: 'Sales not found' })).to.equal(false);
  });

  it('Deve mostrar Internal Server Error se tiver o erro 500', async function () {
    const errorMessage = 'Internal Server Error';
    Sinon.stub(service, 'getSalesById').rejects(new Error(errorMessage));
    const req = { params: { id: 453 } };
    const res = { status: Sinon.stub(), json: Sinon.stub() };

    res.status.returns(res);

    await controller.getSalesById(req, res);

    Sinon.assert.calledWith(res.status, 500);
    Sinon.assert.calledWith(res.json, { message: errorMessage });
  });

  it('Checa quando pede um Id que existe', async function () {
    Sinon.stub(service, 'getSalesById').resolves(sales01);
    const req = {
      params: { SalesID: 1 },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await controller.getSalesById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(sales01)).to.be.equal(true);
  });

  afterEach(function () {
    Sinon.restore();
  });
});
