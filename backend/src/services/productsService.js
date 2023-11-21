const productsModel = require('../models/productsModel');

const getProducts = async () => {
  try {
    const products = await productsModel.getProducts();
    return products;
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductById,
};
