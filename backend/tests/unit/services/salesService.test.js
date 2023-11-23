const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/salesModel');
const service = require('../../../src/services/salesService');
const { sales01, mockSales } = require('../../mocks/salesMock');

describe('Testes do salesService:', function () {
  it('Verifica se retorna o objeto do sales desejado', async function () {
    const stub = sinon.stub(model, 'getSalesById').resolves(sales01);

    const result = await service.getSalesById(mockSales);
    expect(result).to.equal(sales01);

    expect(stub.calledOnce).to.equal(true);
    expect(stub.calledWith(mockSales)).to.equal(true);
    stub.restore();
  });
  it('Verifica se retorna a mensagem de erro', async function () {
    const errorMessage = 'Sales not found';
    const stub = sinon.stub(model, 'getSalesById').rejects(new Error(errorMessage)); 
  
    try {
      await service.getSalesById(651);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  
    expect(stub.calledOnce).to.equal(true);
    stub.restore();
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
