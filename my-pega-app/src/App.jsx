import CaseList from './components/CaseList.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <section>
          <h2>Liste des cas</h2>
          <CaseList />
        </section>
      </main>
    </div>
  );
}

export default App;
