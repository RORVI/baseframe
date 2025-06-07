const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Baseframe API',
      version: '1.0.0',
      description: 'Auto-generated OpenAPI documentation for the Baseframe API'
    }
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
