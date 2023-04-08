const { Kafka } = require('kafkajs');
const antifraudService = require('../services/antifraudService');

class KafkaConsumer {
  constructor(topic) {
    this.topic = topic;
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });
  }

  async start() {
    const consumer = this.kafka.consumer({ groupId: 'my-group' });

    await consumer.connect();
    console.log('Consumidor conectado');
    await consumer.subscribe({ topic: this.topic, fromBeginning: true });
    console.log('Consumidor suscrito');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Mensaje recibido: ', {
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        // Valida el mensaje
        const transactionReg = JSON.parse(message.value.toString());
        if (typeof transactionReg !== 'undefined' || transactionReg !== null) {
          await antifraudService.validate(transactionReg);
        }
      },
    });

    // Detiene el consumer después de 10 segundos
    setTimeout(async () => {
      await consumer.stop();
      console.log('Consumer detenido.');
    }, 20000);
  }
}

module.exports = KafkaConsumer;
