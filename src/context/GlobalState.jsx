/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";

// 1. Estado inicial e busca de dados do localStorage
const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

// 2. O Reducer define como o estado muda em resposta às ações
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

// 3. Criação do Contexto Global
export const GlobalContext = createContext(initialState);

// 4. Componente Provedor que envolve a aplicação e disponibiliza o estado
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Efeito para salvar transações no localStorage sempre que elas mudarem
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Ações que podemos chamar de qualquer componente
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
