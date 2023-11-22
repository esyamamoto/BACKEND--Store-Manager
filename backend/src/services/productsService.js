const productsModel = require('../models/productsModel');

const getProducts = async () => {
  try {
    const products = await productsModel.getProducts();
    return products;
  } catch (error) {
    console.error({ message: 'Product not found' });
  }
};

const getProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (error) {
    console.error({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
