const connectionDB = require('./db');

const getProducts = async () => {
  try {
    const [products] = await connectionDB.execute('SELECT * FROM products ORDER BY id ASC');
    return products;
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const [product] = await connectionDB.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product[0];
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductById,
};
