import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе к серверу:', error);
    throw error;
  }
};

const getData = async () => {
  try {
    const [sitesData, testsData] = await Promise.all([
      fetchData('http://localhost:3100/sites'),
      fetchData('http://localhost:3100/tests'),
    ]);
    if (Array.isArray(sitesData) && sitesData.length > 0 &&
        Array.isArray(testsData) && testsData.length > 0) {
      return [sitesData, testsData];
    } else {
      console.error('Invalid data received. Sites or tests data is empty or not an array.');
      throw new Error('Invalid data received.');
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

const NoResultsPage = ({ handleResetSearch }) => (
  <div className="no-results">
    <p>Your search did not match any results</p>
    <button onClick={handleResetSearch}>Reset</button>
  </div>
);
NoResultsPage.propTypes = {
  handleResetSearch: PropTypes.func.isRequired,
};

const NavigationItem = ({ label, handleArrowClick }) => (
  <div className="textfield__item" about={label.toLowerCase()}>
    <div className="textfield__item_container">
      <p>{label}</p>
      <div className="textfield__arrow">
        <button className="textfield__arrow_up" tabIndex="0" onClick={() => handleArrowClick('up', label)}></button>
        <button className="textfield__arrow_down" tabIndex="0" onClick={() => handleArrowClick('down', label)}></button>
      </div>
      </div>
  </div>
);
NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};

const Navigation = ({ onSearch, numTests, showNavigationInfo, handleArrowClick }) => (
  <div className="navigation">
    <div className="navigation__search">
      <div className="searchbar">
        <div className="searchbar__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
            <path d="M12.802 12.751L9.59779 9.28668C10.4217 8.26764 10.8735 6.98629 10.8735 5.65218C10.8735 2.53599 8.43501 0 5.43575 0C2.43851 0 0 2.53529 0 5.65218C0 8.76978 2.43851 11.3051 5.43575 11.3051C6.56132 11.3051 7.6348 10.9527 8.55068 10.2818L11.7799 13.7735C11.9152 13.9198 12.0958 14 12.2913 14C12.4746 14 12.6491 13.9269 12.7817 13.7939C13.0651 13.5119 13.0733 13.045 12.802 12.751ZM5.43575 1.47476C7.65171 1.47476 9.45506 3.34897 9.45506 5.65218C9.45506 7.95609 7.65239 9.83031 5.43575 9.83031C3.22113 9.83031 1.41846 7.95609 1.41846 5.65218C1.41846 3.34968 3.22113 1.47476 5.43575 1.47476Z" fill="#222222"/>
          </svg>
          <input
            autoComplete="off"
            className="searchbar__field-text"
            placeholder="What test are you looking for?"
            spellCheck="false"
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="searchbar__field-info" type="button">
            {numTests} tests
          </button>
        </div>
      </div>
    </div>
    {showNavigationInfo && (
      <div className="navigation__info">
        <div className="textfield">
          <NavigationItem label="Name" handleArrowClick={handleArrowClick} />
          <NavigationItem label="Type" handleArrowClick={handleArrowClick} />
          <NavigationItem label="Status" handleArrowClick={handleArrowClick} />
          <NavigationItem label="Site" handleArrowClick={handleArrowClick} />
        </div>
      </div>
    )}
  </div>
);
Navigation.propTypes = {
  onSearch: PropTypes.func.isRequired,
  numTests: PropTypes.number.isRequired,
  showNavigationInfo: PropTypes.bool.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};

const DashboardItem = ({ test, site }) => {
  const setSiteClass = (siteId) => {
    const classData = {
      1: 'pink',
      2: 'light-violet',
      default: 'violet',
    };
    return classData[siteId] || classData.default;
  };
  const setStatusClass = (status) => {
    const classData = {
      DRAFT: 'grey',
      ONLINE: 'green',
      PAUSED: 'orange',
      default: 'red',
    };
    return classData[status] || classData.default;
  };

  return (
    <div key={test.id} className="table__item" tabIndex={test.id}>
      <div className={`table__item__info ${setSiteClass(site.id)}`} about="indicator"></div>
      <div className="table__item__info" about="name">{test.name}</div>
      <div className="table__item__info" about="type">{test.type}</div>
      <div className={`table__item__info ${setStatusClass(test.status)}`} about="status">{test.status}</div>
      <div className="table__item__info" about="site">{site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '') : "Unknown Site"}</div>
      <div className={`table__item__info ${test.status === "DRAFT" ? 'active' : 'disabled'}`} about="button">
        <button><span>{test.status === "DRAFT" ? 'Finalize' : 'Result'}</span></button>
      </div>
    </div>
  );
};
DashboardItem.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    siteId: PropTypes.number.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

const TemplateDashboard  = ({ testsData, sitesData, searchQuery, onResetSearch }) => {
  // START: логика для поиска
  const siteLookup = {};
  sitesData.forEach((site) => {
    siteLookup[site.id] = site;
  });
  const filteredTests = testsData.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const noResults = filteredTests.length === 0;

  const handleResetSearch = () => {
    onResetSearch();
    const searchInput = document.querySelector('.searchbar__field-text');
    if (searchInput) searchInput.value = '';
  };
  // END: логика для поиска

  if (testsData.length === 0 || sitesData.length === 0) {
    return null;
  }

  return (
    <div className="table">
      {noResults ? (
        <NoResultsPage handleResetSearch={handleResetSearch} />
      ) : (
        filteredTests.map((test) => {
          const site = siteLookup[test.siteId];
          return <DashboardItem key={test.id} test={test} site={site} />;
        })
      )}
    </div>
  );
};
TemplateDashboard.propTypes = {
  testsData: PropTypes.array.isRequired,
  sitesData: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onResetSearch: PropTypes.func.isRequired,
};

export const Dashboard = () => {
  const [testsData, setTestsData] = useState([]);
  const [sitesData, setSitesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [numTests, setNumTests] = useState(0);

  useEffect(() => {
    getData().then(([sites, tests]) => {
      setSitesData(sites);
      setTestsData(tests);
      setNumTests(tests.length);
    });
  }, []);

  console.log('testsData', testsData);
  console.log('sitesData', sitesData);

  // START: логика для поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredTests = testsData.filter((test) =>
      test.name.toLowerCase().includes(query.toLowerCase())
    );
    setNumTests(filteredTests.length);
  };
  const handleResetSearch = () => {
    setSearchQuery('');
    setNumTests(testsData.length);
  };
  const showNavigationInfo = numTests > 0;
  // END: логика для поиска

  // START: логика для сортировки
  const handleArrowClick = (direction, item) => {
    const sortedTests = [...testsData];
    sortedTests.sort((a, b) => {
      const fieldA = getFieldData(a, item);
      const fieldB = getFieldData(b, item);
      if (direction === 'up') {
        return compareFields(fieldA, fieldB);
      } else {
        return compareFields(fieldB, fieldA);
      }
    });
    setTestsData(sortedTests);
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
      case 'Name':
        return test.name.toLowerCase();
      case 'Type':
        return test.type.toLowerCase();
      case 'Status':
        return getStatusOrder(test.status);
      case 'Site':
        const site = sitesData.find((site) => site.id === test.siteId);
        console.log('site ', site.url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase() );
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
        <Navigation onSearch={handleSearch} numTests={numTests} showNavigationInfo={showNavigationInfo} handleArrowClick={handleArrowClick} />
        <TemplateDashboard  testsData={testsData} sitesData={sitesData} searchQuery={searchQuery} onResetSearch={handleResetSearch} />
      </div>
    </div>
  );
};
