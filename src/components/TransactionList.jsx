import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  if (transactions.length === 0) {
    return <p>Nenhuma transação adicionada ainda.</p>;
  }

  return (
    <div>
      <h3>Histórico</h3>
      <ul className="list">
        {transactions.map(transaction => {
          const sign = transaction.amount < 0 ? '-' : '+';
          const itemClass = transaction.amount < 0 ? 'minus' : 'plus';

          return (
            <li key={transaction.id} className={itemClass}>
              <span>{transaction.text}</span>
              <div>
                <span>
                  {sign}R$ {Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button onClick={() => deleteTransaction(transaction.id)} className="btn-delete">
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TransactionList;
