const { getConnection, getRepository } = require('typeorm');
const { v4: uuidv4 } = require('uuid');
const { Transaction } = require('../entities/transaction');
const KafkaProducer = require('../utils/kafkaProducer');
const KafkaConsumer = require('../utils/kafkaConsumer');

class supportService {
  static async crearTransaccion(transactionData) {
    try {
      const transaction = new Transaction();
      console.log('uuidv4(): ', uuidv4());
      transaction.id = uuidv4();
      transaction.accountExternalIdDebit = transactionData.accountExternalIdDebit;
      transaction.accountExternalIdCredit = transactionData.accountExternalIdCredit;
      transaction.transferTypeId = transactionData.transferTypeId;
      transaction.value = transactionData.value;
      transaction.transactionStatus = 'Pendiente';

      const connection = await getConnection();
      const transactionCreated = await connection.manager.save(transaction);
      return transactionCreated;
    } catch (error) {
      console.log(error);
      throw new Error(`Ocurrió un error al crear la transacción.${error}`);
    }
  }

  static async sendMessageProducer(transaction) {
    try {
      const kafkaProducer = new KafkaProducer('transactions');
      await kafkaProducer.connect();
      await kafkaProducer.sendMessage(transaction);
      console.log('Se envió el mensaje correctamente');

      await kafkaProducer.disconnect();
    } catch (error) {
      console.log(error);
      throw new Error(`Ocurrió un error al ejecutar el Productor.${error}`);
    }
  }

  static async validTransactionInConsumer() {
    try {
      const kafkaConsumer = new KafkaConsumer('transactions');
      await kafkaConsumer.start();
    } catch (error) {
      console.log(error);
      throw new Error(`Ocurrió un error al ejecutar el Consumidor.${error}`);
    }
  }

  static async getTransaccion(transactionExternalId) {
    const transactionRepository = getRepository(Transaction);
    const transactionFind = await transactionRepository.findOne({ where: { id: transactionExternalId } });
    console.log('transaction encontrado: ', transactionFind);

    if (!transactionFind) {
      throw new Error('Transacción no encontrada');
    }

    return transactionFind;
  }
}

module.exports = supportService;
