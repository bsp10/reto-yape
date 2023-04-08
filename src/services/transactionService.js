const supportService = require("./supportService");

async function createTransaction(transactionData) {
  const transactionCreated = await supportService.crearTransaccion(transactionData);
  await supportService.sendMessageProducer(transactionCreated);
  transactionCreated.mensaje = 'Ejecución Satisfactoria';
  return transactionCreated;
}

async function validateTransaction(transactionData) {
  await supportService.validTransactionInConsumer(transactionData);
  return 'Se ejecutó la validación';
}

async function getTransaction(transactionExternalId) {
  const transactionFind = await supportService.getTransaccion(transactionExternalId);
  return transactionFind;
}

module.exports = {
  createTransaction,
  getTransaction,
  validateTransaction,
};
