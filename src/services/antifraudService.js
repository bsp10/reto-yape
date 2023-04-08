const { getConnection } = require('typeorm');
const { Transaction } = require('../entities/transaction');

class AntifraudService {
  static async validate(transaction) {
    // Rechaza transacciones con valor superior a 1000
    if (parseFloat(transaction.value) > 1000.00) {
      await this.updateTransactionStatus(transaction, 'Rechazado');
    } else {
      await this.updateTransactionStatus(transaction, 'Aprobado');
    }
    return true;
  }

  static async updateTransactionStatus(transaction, newStatus) {
    try {
      console.log('updateTransactionStatus');
      console.log('transactionUpd: ', transaction);
      const transactionUpd = new Transaction();
      transactionUpd.id = transaction.id;
      transactionUpd.accountExternalIdDebit = transaction.accountExternalIdDebit;
      transactionUpd.accountExternalIdCredit = transaction.accountExternalIdCredit;
      transactionUpd.transferTypeId = transaction.transferTypeId;
      transactionUpd.value = transaction.value;
      transactionUpd.transactionStatus = newStatus;

      const connection = await getConnection();
      await connection.manager.save(transactionUpd);
      console.log(`Actualizando estado de la transacción a '${newStatus}'...`);
    } catch (error) {
      throw new Error(`Ocurrió un error al actualizar la transacción.${error}`);
    }
  }
}

module.exports = AntifraudService;
