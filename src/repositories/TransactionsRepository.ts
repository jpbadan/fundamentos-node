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

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  private allTransactions: AllTransactions;

  constructor() {
    this.transactions = [];
    this.balance = this.getBalance();
    this.allTransactions = this.all();
  }

  public all(): AllTransactions {
    this.allTransactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return this.allTransactions;
  }

  public getBalance(): Balance {
    function incomeReducer(income: number, transaction: Transaction): number {
      if (transaction.type === 'income') {
        return transaction.value + income;
      }
      return income;
    }

    function outcomeReducer(outcome: number, transaction: Transaction): number {
      if (transaction.type === 'outcome') {
        return transaction.value + outcome;
      }
      return outcome;
    }

    const totalIncome = this.transactions.reduce(incomeReducer, 0);
    const totalOutcome = this.transactions.reduce(outcomeReducer, 0);

    this.balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return this.balance;
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
