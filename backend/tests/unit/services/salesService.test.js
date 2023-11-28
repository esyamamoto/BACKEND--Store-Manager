const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { sales01, mockSales } = require('../../mocks/salesMock');
const productModel = require('../../../src/models/productsModel');
const { salesId, mockProducts } = require('../../mocks/produtsMocks');

describe('Testes do salesService:', function () {
  it('Verifica se retorna o objeto do sales desejado', async function () {
    const stub = sinon.stub(salesModel, 'getSalesById').resolves(sales01);

    const result = await salesService.getSalesById(mockSales);
    expect(result).to.equal(sales01);

    expect(stub.calledOnce).to.equal(true);
    expect(stub.calledWith(mockSales)).to.equal(true);
    stub.restore();
  });

  it('Verifica se retorna a mensagem de erro', async function () {
    const errorMessage = 'Sale not found';
    const stub = sinon.stub(salesModel, 'getSalesById').rejects(new Error(errorMessage)); 
  
    try {
      await salesService.getSalesById(651);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  
    expect(stub.calledOnce).to.equal(true);
    stub.restore();
  });

  it('Verifica se todas as quantidades são válidas', async function () {
    const response = await salesService.quantityOK(mockSales);
    expect(response.status).to.equal('SUCCESS');
  });

  it('Verifica se não é possível adicionar com quantidade igual ou menor que 0', async function () {
    sinon.stub(productModel, 'getProducts').resolves(mockProducts);
    sinon.stub(salesModel, 'createInsertSale').resolves(salesId);
    const inputSaleNoId = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.newSalesService(inputSaleNoId);
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('Verifica se não é possível adicionar sem quantidade', async function () {
    sinon.stub(productModel, 'getProducts').resolves(mockProducts);
    sinon.stub(salesModel, 'createInsertSale').resolves(salesId);
    const inputSaleNoId = [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.newSalesService(inputSaleNoId);
    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.data.message).to.be.equal('"quantity" is required');
  });

  it('Checa se é possivel adicionar novas sales', async function () {
    sinon.stub(productModel, 'getProducts').resolves(mockProducts);
    sinon.stub(salesModel, 'createInsertSale').resolves(salesId);
    const inputSaleNoId = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.newSalesService(inputSaleNoId);
    expect(response.status).to.be.equal('CREATED');
  });

  afterEach(function () {
    sinon.restore();
  });
});
