const { EntitySchema } = require('typeorm');

class Transaction {
  constructor(id, accountExternalIdDebit, accountExternalIdCredit, transferTypeId, value, transactionStatus) {
    this.id = id;
    this.accountExternalIdDebit = accountExternalIdDebit;
    this.accountExternalIdCredit = accountExternalIdCredit;
    this.transferTypeId = transferTypeId;
    this.value = value;
    this.transactionStatus = transactionStatus;
  }
}

const TransactionSchema = new EntitySchema({
  name: 'Transaction',
  target: Transaction,
  tableName: 'transaction',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
    },
    accountExternalIdDebit: {
      unique: true,
      type: 'int',
    },
    accountExternalIdCredit: {
      type: 'int',
    },
    transferTypeId: {
      type: 'int',
    },
    value: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    transactionStatus: {
      type: 'varchar',
      length: 100,
    },
  },
});

module.exports = {
  Transaction,
  TransactionSchema,
};
