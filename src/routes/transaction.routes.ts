import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreatebalanceService from '../services/CreateBalanceService';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const createbalanceService = new CreatebalanceService(
      transactionsRepository
    );

    const balance = createbalanceService.execute();

    const transactions = transactionsRepository.all(balance);

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository
    );

    const transaction = createTransactionService.execute({
      title,
      type,
      value
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
