import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import TRANSACTION_TYPE from '../utils/strings';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    if (type !== TRANSACTION_TYPE.INCOME && type !== TRANSACTION_TYPE.OUTCOME)
      throw Error('Invalid transaction type');

    const total = this.transactionsRepository
      .index()
      .reduce(
        (acc, item: Transaction) =>
          item.type === 'income' ? acc + item.value : acc,
        0
      );
    const outcome = this.transactionsRepository
      .index()
      .reduce(
        (acc, item: Transaction) =>
          item.type === 'outcome' ? acc + item.value : acc,
        0
      );

    if (type === 'outcome' && value + outcome > total)
      throw Error('Value should be less than income total !!');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
