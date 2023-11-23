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

const newProductService = async (newProduct) => {
  // coloquei validação no middlewares
  try {
    const product = await productsModel.newProductModel(newProduct);
    return ({ status: 'CREATED', data: product });
  } catch (error) {
    console.error('Error creating new product:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  getProducts,
  getProductById,
  newProductService,
};
