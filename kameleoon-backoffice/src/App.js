import React, { useEffect, useState } from 'react';
import { Navigation, Table } from './components/Markup';

function App() {
  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  };

    const [sitesData, setSitesData] = useState('');
    const [testsData, setTestsData] = useState('');
  
    useEffect(() => {
      fetchData('http://localhost:3100/tests', setSitesData);
    }, []);
  
    useEffect(() => {
      fetchData('http://localhost:3100/sites', setTestsData);
    }, []);
  
    console.log('{sitesData}', { sitesData });
    console.log('{testsData}', { testsData });

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
