import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    // data validation
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Wrong type. type must be <income> or <outcome>');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
