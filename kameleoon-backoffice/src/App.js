import { Table } from './components/Markup';

function App() {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard__container">
        <Table />
      </div>
    </div>
  );
}

export default App;
