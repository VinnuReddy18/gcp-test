const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

/**
 * Swagger setup
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Simple Express API with Swagger',
    },
    servers: [
      {
        url: 'https://test-237461081241.asia-south1.run.app', // your deployed URL
      },
    ],
  },
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '🚀 Hello from Cloud Run!',
    time: new Date(),
  });
});

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Adds two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               num1:
 *                 type: number
 *               num2:
 *                 type: number
 *             required:
 *               - num1
 *               - num2
 *     responses:
 *       200:
 *         description: The result of addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 */
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Please send valid numbers in num1 and num2',
    });
  }

  const sum = num1 + num2;

  res.json({
    status: 'success',
    result: sum,
    message: `✅ The sum of ${num1} and ${num2} is ${sum}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
