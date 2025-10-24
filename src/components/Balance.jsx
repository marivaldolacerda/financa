import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

// Função para formatar números para BRL (R$)
// Ela já inclui o "R$", o separador de milhar (ponto) e o decimal (vírgula).
const formatBRL = (number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div>
      <h4>Seu Saldo</h4>
      <h1 style={{ color: total < 0 ? "red" : "green" }}>{formatBRL(total)}</h1>
      <div className="balance-container">
        <div>
          <h3>Receitas</h3>
          <p style={{ color: "green" }}>{formatBRL(income)}</p>
        </div>
        <div>
          <h3>Despesas</h3>
          <p style={{ color: "red" }}>{formatBRL(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
