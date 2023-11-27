const salesModel = require('../models/salesModel');
const modelProduct = require('../models/productsModel');

// função assíncrona chama a função getSales do modelo salesModel para obter todas as vendas do banco de dados.
const getSales = async () => {
  try {
    const sales = await salesModel.getSales();
    return sales;
  } catch (error) {
    console.error({ message: 'Sale not found' });
  }
};

// função assíncrona recebe um parâmetro id e chama a função getSalesById do modelo salesModel para obter detalhes de uma venda específica por ID.
const getSalesById = async (id) => {
  try {
    const sales = await salesModel.getSalesById(id);
    return sales;
  } catch (error) {
    console.error({ message: 'Sale not found' });
  }
};

// checar id  do produto 
const productIdOK = async (sales) => {
  try {
    const products = await modelProduct.getProducts(); // Obtenha a lista de todos os produtos
    
    const definedProdId = sales.some((sale) => !sale.productId); // Verifique se todos os itens de venda têm um productId definido
    if (definedProdId) {
      return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };
    }
    const invalidProducts = sales
      .filter((sale) => !products.some((product) => product.id === sale.productId)); // Verifique se todos os IDs de produtos nas vendas são válidos

    if (invalidProducts.length > 0) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    return { status: 'SUCCESS', data: { message: 'ProductID are valid' } };
  } catch (error) {
    console.error('Error checking product IDs:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

// checar quantidade do produto
const quantityOK = async (sales) => {
  try {
    const quantityOKorNot = sales.some((sale) => sale.quantity === undefined); // Verifique se todas as vendas têm uma quantidade definida
    if (quantityOKorNot) {
      return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
    }
    const invalidQuantity = sales.some((sale) => sale.quantity <= 0); // Verifique se todas as quantidades são válidas (maiores que zero)
    if (invalidQuantity) {
      return { status: 'INVALID_VALUE', 
        data: { message: '"quantity" must be greater than or equal to 1' } };
    }

    // Se todas as quantidades são válidas, retorne sucesso
    return { status: 'SUCCESS', data: { message: 'Quantities are valid' } };
  } catch (error) {
    console.error('Error checking quantities:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

// função assíncrona recebe um parâmetro newSales e chama a função createInsertSale do modelo salesModel para criar e inserir uma nova venda no banco de dados.
const newSalesService = async (newSales) => {
  try {
    // Verifique se os productId estão OK
    const validProdOK = await productIdOK(newSales);
    if (validProdOK.status !== 'SUCCESS') {
      return validProdOK;
    }

    // Verifique se as quantidades estão OK
    const quantityValOK = await quantityOK(newSales);
    if (quantityValOK.status !== 'SUCCESS') {
      return quantityValOK;
    }

    // Se todas as validações passarem, crie e insira a nova venda no banco de dados
    const salesId = await salesModel.createInsertSale(newSales);

    return { status: 'CREATED', data: { id: salesId, itemsSold: newSales } };
  } catch (error) {
    console.error('Error creating new sale:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  getSales,
  getSalesById,
  newSalesService,
  productIdOK,
  quantityOK,
};
