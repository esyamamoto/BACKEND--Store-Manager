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

  it('Deve criar um novo produto através do serviço', async function () {
    Sinon.stub(model, 'newProductModel').resolves(product01);
    const inputData = { name: '12345' };

    const response = await service.newProductService(inputData);
    expect(response.status).to.equal('CREATED');
    expect(response.data).to.equal(product01);
  });

  afterEach(function () {
    Sinon.restore();
  });
});