const camelize = require('camelize');
const connectionDB = require('./db');

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

module.exports = {
  getSales,
  getSalesById,
};
