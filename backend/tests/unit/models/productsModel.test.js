const { expect } = require('chai');
const Sinon = require('sinon');
const model = require('../../../src/models/productsModel');
const service = require('../../../src/services/productsService');

describe('Testes do productsService:', function () {
  it('Verifica se retorna a mensagem de erro', async function () {
    const errorMessage = 'Product not found';
    const stub = Sinon.stub(model, 'getProductById').rejects(new Error(errorMessage)); 
  
    try {
      await service.getProductById(651);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  
    expect(stub.calledOnce).to.equal(true);
    stub.restore();
  });
  
  afterEach(function () {
    Sinon.restore();
  });
});
