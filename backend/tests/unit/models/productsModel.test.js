const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/productsModel');
const service = require('../../../src/services/productsService');
const db = require('../../../src/models/db');

describe('Testes do productsService:', function () {
  it('Verifica se retorna a mensagem de erro', async function () {
    const errorMessage = 'Product not found';
    const stub = sinon.stub(model, 'getProductById').rejects(new Error(errorMessage)); 
  
    try {
      await service.getProductById(651);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  
    expect(stub.calledOnce).to.equal(true);
    stub.restore();
  });

  it('Retornar os products', async function () {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    sinon.stub(db, 'execute').resolves([products]);

    const productsAll = await model.getProducts();

    expect(productsAll).to.deep.equal(products);

    db.execute.restore();
  });
  
  it('Retorna se foi possivel criar um novo produto com sucesso', async function () {
    const newProduct = { name: 'ProdutoX' };
    const insertId = 4;
    
    sinon.stub(db, 'execute').resolves([{ insertId }]);
    
    const result = await model.newProductModel(newProduct);
  
    expect(result).to.deep.equal({ id: insertId, name: newProduct.name });
  
    db.execute.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});