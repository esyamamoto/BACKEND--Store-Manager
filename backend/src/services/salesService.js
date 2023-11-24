const salesModel = require('../models/salesModel');

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

// função assíncrona recebe um parâmetro newSales e chama a função createInsertSale do modelo salesModel para criar e inserir uma nova venda no banco de dados.
const newSalesService = async (newSales) => {
  try {
    const salesId = await salesModel.createInsertSale(newSales);
    return ({ status: 'CREATED', data: { id: salesId, itemsSold: newSales } });
  } catch (error) {
    console.error('Error creating new sale:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  getSales,
  getSalesById,
  newSalesService,
};
