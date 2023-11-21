const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];
const product01 = {
  id: 1,
  name: 'Martelo de Thor',
};

const productOK = { status: 'SUCCESS', data: product01 };

module.exports = {
  mockProducts,
  product01,
  productOK,
};