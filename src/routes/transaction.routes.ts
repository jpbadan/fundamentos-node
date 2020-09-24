import { Router } from 'express';
// import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.status(200).json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({ title, value, type });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.get('/balance', (request, response) => {
  return response.json(transactionsRepository.getBalance());
});

export default transactionRouter;
