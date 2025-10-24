import { useEffect, useState } from 'react';
import { GlobalProvider } from './context/GlobalState';
import AddTransactionPage from './pages/AddTransactionPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // Este estado controla qual "página" é exibida
  const [page, setPage] = useState('dashboard');

  // Hook para registrar o Service Worker (parte do PWA)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service worker registrado com sucesso:', reg))
          .catch(err => console.log('Erro ao registrar service worker:', err));
      });
    }
  }, []);

  return (
    // O GlobalProvider envolve toda a aplicação
    <GlobalProvider>
      <div className="container">
        <header>
          <nav>
            <h1>Gestor Financeiro</h1>
            <div>
              <button onClick={() => setPage('dashboard')} className="btn-nav">
                Dashboard
              </button>
              <button onClick={() => setPage('add')} className="btn-nav">
                Adicionar
              </button>
            </div>
          </nav>
        </header>
        <main>
          {/* Renderização condicional da página */}
          {page === 'dashboard' ? <DashboardPage /> : <AddTransactionPage setPage={setPage} />}
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
