const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'Documentation for e-commerce API endpoints',
    version: '1.0.0',
    contact: {
      name: "Your Name",
      email: "your.email@example.com"
    }
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Products',
      description: 'Products endpoints'
    },
    {
      name: 'Cart',
      description: 'Shopping cart endpoints'
    },
    {
      name: 'Orders',
      description: 'Order management endpoints'
    },
    {
      name: 'Auth',
      description: 'Authentication endpoints'
    },
    {
      name: 'Categories',
      description: 'Categories endpoints'
    }
  ],
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Áo thun' },
          category: { type: 'string', example: 'Quần áo' },
          price: { type: 'number', example: 150000 },
          rating: { type: 'number', example: 3 },
          imgurl: { type: 'string', example: 'https://example.com/image.jpg' }
        }
      },
      Cart: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID who owns the cart'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: {
                  type: 'number',
                  description: 'Product ID in cart'
                },
                quantity: {
                  type: 'number',
                  description: 'Quantity of product'
                }
              }
            }
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'Quần áo'
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './app/api/products/route.js',
  './app/api/product/route.js',
  './app/api/cart/route.js',
  './app/api/order/route.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);