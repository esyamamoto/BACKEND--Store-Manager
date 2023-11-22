const { expect } = require('chai');
const Sinon = require('sinon');
const model = require('../../../src/models/productsModel');
const service = require('../../../src/services/productsService');
const { product01, mockProducts } = require('../../mocks/produtsMocks');

describe('Testes do productsService:', function () {
  it('Verifica se retorna o objeto do produto desejado', async function () {
    const stub = Sinon.stub(model, 'getProductById').resolves(product01);

    const result = await service.getProductById(mockProducts);
    expect(result).to.equal(product01);

    expect(stub.calledOnce).to.equal(true);
    expect(stub.calledWith(mockProducts)).to.equal(true);
    stub.restore();
  });
  
  afterEach(function () {
    Sinon.restore();
  });
});
