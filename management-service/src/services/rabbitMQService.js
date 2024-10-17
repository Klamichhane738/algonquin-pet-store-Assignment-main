const amqp = require('amqplib/callback_api');
const config = require('../config/config');

let orders = [];

const connectRabbitMQ = () => {
  amqp.connect(config.rabbitMQ.url, (err, conn) => {
    if (err) {
      console.error('Error connecting to RabbitMQ:', err);
      return;
    }

    conn.createChannel((err, channel) => {
      if (err) {
        console.error('Error creating channel:', err);
        return;
      }

      const queue = 'order_queue'; // Ensure this matches the order-service

      // Declare the queue with durable: true
      channel.assertQueue(queue, { durable: true });
      console.log(`Waiting for messages in ${queue}`);

      // Consume messages from the queue
      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const order = JSON.parse(msg.content.toString());
          orders.push(order);
          console.log("Received order from RabbitMQ queue:", order);
          channel.ack(msg);  // Acknowledge message receipt
        } else {
          console.log("No message received from RabbitMQ");
        }
      });
    });
  });
};

const getOrders = () => orders;

module.exports = {
  connectRabbitMQ,
  getOrders,
};
