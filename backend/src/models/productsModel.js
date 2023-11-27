const connectionDB = require('./db');

// Obtém todos os produtos do banco de dados
const getProducts = async () => {
  try {
    const [products] = await connectionDB.execute('SELECT * FROM products ORDER BY id ASC');
    return products;
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

// Obtém um produto pelo ID do banco de dados
const getProductById = async (id) => {
  try {
    const [product] = await connectionDB.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product[0];
  } catch (error) {
    console.error({ message: 'Product not found' });
    throw error;
  }
};

// Insere um novo produto no banco de dados
const newProductModel = async (newProduct) => {
  try {
    const { name } = newProduct;
    const [{ insertId }] = await connectionDB.execute(
      'INSERT INTO products (name) VALUES (?)',
      [name],
    );
    return { id: insertId, name };
  } catch (error) {
    console.error({ message: 'Product not registered' });
    throw error;
  }
};

// Atualiza o nome de um produto no banco de dados
const updateProductModel = async (name, id) => {
  try {
    const [{ affectedRows }] = await connectionDB
      .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
    return affectedRows;
  } catch (error) {
    console.error({ message: 'Product not updated' });
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductById,
  newProductModel,
  updateProductModel,
};
