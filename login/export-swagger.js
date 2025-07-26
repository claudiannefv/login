const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Login',
      version: '1.0.0',
      description: 'API para gestão de login (estudo de testes)'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./index.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('swagger.json gerado com sucesso!'); 