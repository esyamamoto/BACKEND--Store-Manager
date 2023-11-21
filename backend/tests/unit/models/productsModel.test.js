/* const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connectionDB = require('../../../src/models/db');

describe('Model de Produtos', function () {
  it('deve retornar um produto específico', async function () {
    const noProduct = { id: 1, name: 'Martelo de Thor' };

    sinon.stub(connectionDB, 'execute').resolves([[noProduct]]);

    const product = await productsModel.getProductById(1);

    expect(product).to.deep.equal(noProduct);

    connectionDB.execute.restore();
  });
});

*/
