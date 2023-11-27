const productsService = require('../services/productsService');
const mapStatusHTTP = require('../middlewares/stattusHTTP');
const updateProductsService = require('../services/productsService');

// Obtém todos os produtos
const getAllProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtém um produto pelo ID do banco de dados
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error({ message: 'Product not found' });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Insere um novo produto no banco de dados
const newProductController = async (req, res) => { 
  try {
    const newProduct = req.body;
    const { status, data } = await productsService.newProductService(newProduct);
    return res.status(mapStatusHTTP[status]).json(data);
  } catch (error) {
    console.error('Error creating new product:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

// Atualiza o nome de um produto no banco de dados
const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await updateProductsService.updateProductService(name, id);
    const product = await productsService.getProductById(id);
    if (product === undefined) {
      return res.status(404).json({ message: 'Product not found' });
    } res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};  

module.exports = {
  getAllProducts,
  getProductById,
  newProductController,
  updateProductController,
};
