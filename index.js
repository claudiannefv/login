const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Dados em memória
const users = {
  'maria': { senha: '123456', tentativas: 0, bloqueado: false }
};

// Swagger config
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
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Login inválido
 *       423:
 *         description: Usuário bloqueado
 */
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const user = users[usuario];
  if (!user) return res.status(401).json({ mensagem: 'Login inválido' });
  if (user.bloqueado) return res.status(423).json({ mensagem: 'Usuário bloqueado' });
  if (user.senha === senha) {
    user.tentativas = 0;
    return res.json({ mensagem: 'Login realizado com sucesso' });
  } else {
    user.tentativas++;
    if (user.tentativas >= 3) {
      user.bloqueado = true;
      return res.status(423).json({ mensagem: 'Usuário bloqueado por excesso de tentativas' });
    }
    return res.status(401).json({ mensagem: 'Login inválido' });
  }
});

/**
 * @swagger
 * /recuperar-senha:
 *   post:
 *     summary: Recupera a senha do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha recuperada
 *       404:
 *         description: Usuário não encontrado
 */
app.post('/recuperar-senha', (req, res) => {
  const { usuario } = req.body;
  const user = users[usuario];
  if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  user.tentativas = 0;
  user.bloqueado = false;
  // Para estudo, "recupera" a senha mostrando a senha atual
  return res.json({ mensagem: 'Senha recuperada', senha: user.senha });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
  console.log('Swagger em http://localhost:3000/api-docs');
}); 