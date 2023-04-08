const express = require('express');

const router = express.Router();
const transactionService = require('../services/transactionService');
const validate = require('../validation/validate');

router.post('/create', async (req, res) => {
  try {
    console.log('create inicio');
    console.log('req.body: ', req.body);
    await validate.validateTransaction(req.body.payload);
    const transaction = await transactionService.createTransaction(req.body.payload);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:transactionExternalId', async (req, res) => {
  try {
    console.log('req: ', req.query);
    const transaction = await transactionService.getTransaction(req.query.transactionExternalId);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
