const productsModel = require('../models/productsModel');
const updateProductModel = require('../models/productsModel'); 

// Obtém todos os produtos
const getProducts = async () => {
  try {
    const products = await productsModel.getProducts();
    return products;
  } catch (error) {
    console.error({ message: 'Product not found' });
  }
};

// Obtém um produto pelo ID
const getProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product; 
  } catch (error) {
    console.error({ message: 'Product not found' });
  }
};

// Cria um novo produto
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

// Atualiza um produto
const updateProductService = async (name, id) => {
  try {
    const dataX = await updateProductModel.updateProductModel(name, id);
    if (!dataX) return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
    return { status: 200, data: dataX };
  } catch (error) {
    console.error('Error updating product:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  getProducts,
  getProductById,
  newProductService,
  updateProductService,
};
