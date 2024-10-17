const express = require('express');
const amqp = require('amqplib/callback_api');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'order_queue'; // Ensure this matches

app.post('/orders', (req, res) => {
  const order = req.body;

  amqp.connect(RABBITMQ_URL, (err, conn) => {
    if (err) {
      console.error('Error connecting to RabbitMQ:', err);
      return res.status(500).send('Error connecting to RabbitMQ');
    }

    conn.createChannel((err, channel) => {
      if (err) {
        console.error('Error creating channel:', err);
        return res.status(500).send('Error creating RabbitMQ channel');
      }

      // Declare the queue with durable: true
      channel.assertQueue(QUEUE, { durable: true }, (err, ok) => {
        if (err) {
          console.error('Error asserting queue:', err);
          return res.status(500).send('Error asserting queue');
        }

        const msg = JSON.stringify(order);
        channel.sendToQueue(QUEUE, Buffer.from(msg), { persistent: true });
        console.log("Sent order to queue:", msg);

        res.send('Order received');
      });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Order service is running on http://localhost:${PORT}`);
});
