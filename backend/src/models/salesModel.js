const camelize = require('camelize');
const connectionDB = require('./db');

// Função é responsável por buscar todas as vendas e seus detalhes associados no banco de dados, usando INNER JOIN entre as tabelas sales e sales_products
const getSales = async () => {
  try {
    const [sales] = await connectionDB.execute(`
    SELECT sales_products.sale_id, sales.date, sales_products.product_id, sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales_products.sale_id = sales.id
    ORDER BY sales_products.sale_id, product_id`);
    return camelize(sales);
  } catch (error) {
    console.error({ message: 'Sale not found' });
    throw error;
  }
};
// Função assíncrona para obter detalhes de uma venda específica por ID do banco de dados
const getSalesById = async (id) => {
  try {
    const [sales] = await connectionDB.execute(`
    SELECT sales.date,
    sales_products.product_id, sales_products.quantity
      FROM sales
      INNER JOIN sales_products
      ON sales_products.sale_id = sales.id
      WHERE sales.id = ?`, [id]);
    return camelize(sales);
  } catch (error) {
    console.error({ message: 'Sale not found' });
    throw error;
  }
};

// Função assíncrona para inserir detalhes de vendas no banco de dados
const insertSalesDetails = async (sales, saleId) => {
  try {
    let salesArray = [];
    salesArray = sales.map(({ productId, quantity }) =>
      connectionDB.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [saleId, productId, quantity],
      ));
    await Promise.all(salesArray);
  } catch (error) {
    console.error({ message: 'Error de sales detalhes', error });
  }
};

// Função assíncrona para criar e inserir venda no banco de dados
const createInsertSale = async (sales) => {
  try {
    const [{ insertId: saleId }] = await connectionDB.execute(
      'INSERT INTO sales (date) VALUES (?);',
      [new Date()],
    );
    await insertSalesDetails(sales, saleId);
    return saleId;
  } catch (error) {
    console.error({ message: 'Error criar sales', error });
  }
};

module.exports = {
  getSales,
  getSalesById,
  insertSalesDetails,
  createInsertSale,
};
