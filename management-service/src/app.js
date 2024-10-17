// src/app.js
const express = require('express');
const config = require('./config/config');
const ordersRoute = require('./routes/orders');
const { connectRabbitMQ } = require('./services/rabbitMQService');

const app = express();

app.use(express.json());
app.use('/api', ordersRoute);

app.get('/', (req, res) => {
  res.send('Management Service is running.');
});

const startServer = async () => {
  await connectRabbitMQ();

  app.listen(config.port, () => {
    console.log(`Management Service listening on port ${config.port}`);
  });
};

startServer();
