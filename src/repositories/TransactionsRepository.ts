import Transaction from '../models/Transaction';
import TRANSACTION_TYPE from '../utils/strings';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransacionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface All {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(balance: Balance): All {
    return {
      transactions: this.transactions,
      balance
    };
  }

  public index(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter((item: Transaction) => item.type === TRANSACTION_TYPE.INCOME)
      .reduce((acc: number, item: Transaction) => acc + item.value, 0);

    const outcome = this.transactions
      .filter((item: Transaction) => item.type === TRANSACTION_TYPE.OUTCOME)
      .reduce((acc: number, item: Transaction) => acc + item.value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome
    };

    return balance;
  }

  public create({ title, type, value }: TransacionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
