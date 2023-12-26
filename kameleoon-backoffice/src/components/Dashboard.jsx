import React, { useEffect, useState } from 'react';
import { getData } from './helpers/getData';
import { sortAsc, sortDesc } from './helpers/sortTests';
import { Navigation } from './Navigation';
import { Table } from './Table';

export const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [numTests, setNumTests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSites, fetchedTests] = await getData();
        setSites(fetchedSites);
        setTests(fetchedTests);
        setNumTests(fetchedTests.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // START: the logic for the search
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredTests = tests.filter((test) =>
      test.name.toLowerCase().includes(query.toLowerCase())
    );

    setNumTests(filteredTests.length);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setNumTests(tests.length);
  };

  const hasSearchResult = numTests > 0;
  // END: the logic for the search

  // START: the logic for the sort
  const handleArrowClick = (label, currentDirection) => {
    const sortedTests = currentDirection === 'asc' ? sortAsc(tests, label, sites) : sortDesc(tests, label, sites);
    setTests(sortedTests);
  };
  // END: the logic for the sort

  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <h1 className="dashboard__header">Dashboard</h1>
      </div>
      <div className="dashboard__container">
        <div className="wrapper">
          <Navigation 
            onChange={handleSearch} 
            numTests={numTests} 
            hasSearchResult={hasSearchResult} 
            handleArrowClick={handleArrowClick} 
          />
          <Table 
            tests={tests} 
            sites={sites} 
            searchQuery={searchQuery} 
            onResetSearch={handleResetSearch} 
          />
        </div>
      </div>
    </div>
  );
};
