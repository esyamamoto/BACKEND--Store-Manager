const productsService = require('../services/productsService');
const mapStatusHTTP = require('../middlewares/stattusHTTP');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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

module.exports = {
  getAllProducts,
  getProductById,
  newProductController,
};
