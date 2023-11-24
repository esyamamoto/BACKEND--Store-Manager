const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/salesModel');
const service = require('../../../src/services/salesService');
const db = require('../../../src/models/db');

describe('Testes do salesService:', function () {
  it('Verifica se retorna a mensagem de erro', async function () {
    const errorMessage = 'Sale not found';
    const stub = sinon.stub(model, 'getSalesById').rejects(new Error(errorMessage)); 
  
    try {
      await service.getSalesById(666);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  
    expect(stub.calledOnce).to.equal(true);
    stub.restore();
  });

  it('deve retornar sales', async function () {
    const sales = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];

    sinon.stub(db, 'execute').resolves([sales]);

    const salesAll = await model.getSales();

    expect(salesAll[0]).to.deep.equal(sales[0]);

    db.execute.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});
