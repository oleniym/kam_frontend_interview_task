import React, { useEffect, useState } from 'react';
import { getData } from './helpers/getData';
import { Navigation } from './Navigation';
import { DashboardTemplate } from './DashboardTemplate';
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

  // START: логика для поиска
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
  const showNavigationInfo = numTests > 0; // переименовать на isF ли hasF
  // END: логика для поиска

  // START: логика для сортировки
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
  // END: логика для сортировки



  return (
    <div className="table">
      <div className="table__wrapper">
        <Navigation onChange={handleSearch} numTests={numTests} showNavigationInfo={showNavigationInfo} handleArrowClick={handleArrowClick} />
        <DashboardTemplate  tests={tests} sites={sites} searchQuery={searchQuery} onResetSearch={handleResetSearch} />
      </div>
    </div>
  );
};
