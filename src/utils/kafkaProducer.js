const { Kafka } = require('kafkajs');

class KafkaProducer {
  constructor(topic) {
    this.topic = topic;
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'], // ajusta esta configuración según la ubicación de tu clúster Kafka
    });
    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async sendMessage(transaction) {
    const message = {
      value: JSON.stringify(transaction),
    };

    try {
      const res = await this.producer.send({
        topic: this.topic,
        messages: [message],
      });
      console.log(`Mensaje enviado: ${JSON.stringify(res)}`);
    } catch (error) {
      console.error(`Error al enviar el mensaje: ${error}`);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducer;
