import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

// Recebemos `setPage` para poder voltar à dashboard
const AddTransactionPage = ({ setPage }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // 'expense' ou 'income'
  const [error, setError] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount.trim() === "") {
      setError("Por favor, preencha a descrição e o valor.");
      return;
    }

    const finalAmount =
      type === "expense"
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: finalAmount,
    };

    addTransaction(newTransaction);
    setPage("dashboard"); // Volta para a dashboard após adicionar
  };

  return (
    <div>
      <h3>Nova Transação</h3>

      {/* O botão de voltar foi movido para o App.jsx (header), 
          mas poderia estar aqui também. Vamos focar no formulário. */}

      <form onSubmit={onSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label htmlFor="text">Descrição</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Salário, Aluguel..."
          />
        </div>

        <div>
          <label htmlFor="amount">Valor</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="type"
              checked={type === "income"}
              onChange={() => setType("income")}
            />{" "}
            Receita
          </label>
          <label>
            <input
              type="radio"
              name="type"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />{" "}
            Despesa
          </label>
        </div>

        <button type="submit">Adicionar Transação</button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
