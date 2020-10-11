import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import TRANSACTION_TYPE from '../utils/strings';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreatebalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const income = this.transactionsRepository
      .index()
      .filter((item: Transaction) => item.type === TRANSACTION_TYPE.INCOME)
      .reduce((acc: number, item: Transaction) => acc + item.value, 0);

    const outcome = this.transactionsRepository
      .index()
      .filter((item: Transaction) => item.type === TRANSACTION_TYPE.OUTCOME)
      .reduce((acc: number, item: Transaction) => acc + item.value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome
    };

    return balance;
  }
}

export default CreatebalanceService;
