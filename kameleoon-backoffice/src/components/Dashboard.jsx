import React, { useEffect, useState } from 'react';
import { getData } from './helpers/getData';
import { Navigation } from './Navigation';
import { Table } from './Table';
import { FIELDS_DASHBOARD } from './constants';


export const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [numTests, setNumTests] = useState(0);

  useEffect(() => {
    getData().then(([sites, tests]) => {
      setSites(sites);
      setTests(tests);
      setNumTests(tests.length);
    });
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
  const handleArrowClick = (direction, item) => { 
    const sortedTests = [...tests];

    sortedTests.sort((a, b) => {
      const fieldA = getFieldData(a, item);
      const fieldB = getFieldData(b, item);
      if (direction === 'up') {
        return compareFields(fieldA, fieldB);
      } else {
        return compareFields(fieldB, fieldA);
      }
    });

    setTests(sortedTests);
  };
  
  const compareFields = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    return 0;
  };

  const getFieldData = (test, item) => {
    switch (item) {
      case FIELDS_DASHBOARD.name:
        return test.name.toLowerCase();
      case FIELDS_DASHBOARD.type:
        return test.type.toLowerCase();
      case FIELDS_DASHBOARD.status:
        return getStatusOrder(test.status);
      case FIELDS_DASHBOARD.site:
        const site = sites.find((site) => site.id === test.siteId);
        return site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase() : '';
      default:
        return '';
    }
  };

  const getStatusOrder = (status) => {
    const order = {
      ONLINE: 1,
      PAUSED: 2,
      STOPPED: 3,
      DRAFT: 4,
    };
    return order[status] || 0;
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
