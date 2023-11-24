const salesService = require('../services/salesService');
const mapStatusHTTP = require('../middlewares/stattusHTTP');

// Função assíncrona para obter todas as vendas
const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Função assíncrona para obter detalhes de uma venda por ID
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

// Função assíncrona para processar a entrada de vendas
const newSalesController = async (req, res) => {
  try {
    const newSales = req.body;
    const { status, data } = await salesService.newSalesService(newSales);
    return res.status(mapStatusHTTP[status]).json(data);
  } catch (error) {
    console.error('Error creating new sale:', error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  newSalesController,
};
