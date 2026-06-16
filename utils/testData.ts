export const config = {
  currency: 'USD',
  sku: 'WS12',
  searchTerms: {
    validProduct: 'shirt',
    alternativeProduct: 'bag',
    configurableProduct: 'shirt'
  },
  apiURLs: {
    products: '/rest/default/V1/products?searchCriteria[pageSize]=1'
  },
  URLs: {
    womensTops: '/women/tops-women.html'
  },
  visualRoutes: [
    '/',
    '/default/women.html',
    '/default/women/tops-women/jackets-women.html',
    '/zoe-tank.html',
    '/default/checkout/cart/'
  ]
};
