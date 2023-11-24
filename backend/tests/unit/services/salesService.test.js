const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const productModel = require('../../../src/models/productsModel');
const mockProducts = require('../../mocks/produtsMocks');
const { salesId, sales01, mockSales } = require('../../mocks/salesMock');

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

  it('Verifica se e possivel adicionar novas sales', async function () {
    sinon.stub(productModel, 'getProducts').resolves(mockProducts);
    sinon.stub(salesModel, 'createInsertSale').resolves(salesId);
    const sales = [
      {
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    //  const servRes = await salesService.inputSales(inputSaleNoId);
    const response = await salesService.newSalesService(sales);
    expect(response.status).to.be.equal('CREATED');
  });
  afterEach(function () {
    sinon.restore();
  });
});
