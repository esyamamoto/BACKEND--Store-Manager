const { expect } = require('chai');
const Sinon = require('sinon');
const model = require('../../../src/models/productsModel');
const service = require('../../../src/services/productsService');
const { product01, mockProducts } = require('../../mocks/produtsMocks');
const validation = require('../../../src/middlewares/validation');

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

  it('Verifica se não é possivel atualizar sem a chave Name', async function () {
    Sinon.stub(model, 'getProducts').resolves(mockProducts);
    Sinon.stub(model, 'updateProductModel').resolves();
    const response = await service.updateProductService({}, 1);
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data.message).to.equal('"name" is required');
  });

  afterEach(function () {
    Sinon.restore();
  });
});