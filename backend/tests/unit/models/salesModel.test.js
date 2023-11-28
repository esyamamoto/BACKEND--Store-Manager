const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/salesModel');
const service = require('../../../src/services/salesService');
const db = require('../../../src/models/db');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const productModel = require('../../../src/models/productsModel');
const mockProducts = require('../../mocks/produtsMocks');
const { salesId, mockSales, itemsSold } = require('../../mocks/salesMock');
const connectionDB = require('../../../src/models/db');

describe('Testes do salesService:', function () {
  it('deve retornar todas as sales', async function () {
    sinon.stub(db, 'execute').resolves([mockSales]);
  
    const salesAll = await model.getSales();
  
    expect(salesAll).to.deep.equal(mockSales);
  
    db.execute.restore();
  });
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

  it('Verifica se não é possivel adicionar um produto que não existe', async function () {
    sinon.stub(productModel, 'getProducts').resolves(mockProducts);
    sinon.stub(salesModel, 'createInsertSale').resolves(salesId);
    const inputSaleNoId = [
      {
        productId: 300,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const response = await salesService.newSalesService(inputSaleNoId);
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data.message).to.be.equal('Product not found');
  });

  it('Verifica se insere detalhes de vendas com sucesso', async function () {
    sinon.stub(connectionDB, 'execute').resolves([]);
  
    const result = await model.insertSalesDetails(itemsSold, salesId);
  
    expect(result).to.deep.equal(itemsSold.length[1]);
  
    connectionDB.execute.restore();
  });

  it('deve criar e inserir uma venda no banco de dados', async function () {
    sinon.stub(connectionDB, 'execute').resolves([{ insertId: salesId }]);
    sinon.stub(model, 'insertSalesDetails').resolves();
  
    const result = await model.createInsertSale(itemsSold);
  
    expect(result).to.deep.equal(salesId);
  
    connectionDB.execute.restore();
    model.insertSalesDetails.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});
