const mockSales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const sales01 = [
  {
    saleID: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
];

const salesId = 2;

const salesOK = { status: 'SUCCESS', data: sales01 };
const salesNoFound = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

module.exports = {
  mockSales,
  sales01,
  salesOK,
  salesId,
  salesNoFound,
};