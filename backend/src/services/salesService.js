const salesModel = require('../models/salesModel');

const getSales = async () => {
  try {
    const sales = await salesModel.getSales();
    return sales;
  } catch (error) {
    console.error({ message: 'Sale not found' });
  }
};

const getSalesById = async (id) => {
  try {
    const sales = await salesModel.getSalesById(id);
    return sales;
  } catch (error) {
    console.error({ message: 'Sale not found' });
  }
};

module.exports = {
  getSales,
  getSalesById,
};
