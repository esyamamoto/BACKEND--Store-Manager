const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  try {
    const sales = await salesService.getSalesById(id);

    if (!sales || sales.length === 0) {
      res.status(404).json({ message: 'Sale not found' });
    } else {
      res.status(200).json(sales);
    }
  } catch (error) {
    console.error({ message: 'Sale not found' });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSales,
  getSalesById,
};
