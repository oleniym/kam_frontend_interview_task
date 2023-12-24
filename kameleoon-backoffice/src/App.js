import React, { useEffect, useState } from 'react';
import { Navigation, Table } from './components/Markup';

function App() {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard__container">
        <Navigation />
        <Table />
      </div>
    </div>
  );
}

export default App; // и экспортируем эту фукнцию в index.js
