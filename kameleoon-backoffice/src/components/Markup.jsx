import React, { useEffect, useState } from 'react';



const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log('data FETCH', data);
    return data;
  } catch (error) {
    console.error('Ошибка при запросе к серверу:', error);
    throw error;
  }
};

const fetchDataForBoth = async () => {
  try {
    const [sitesData, testsData] = await Promise.all([
      fetchData('http://localhost:3100/sites'),
      fetchData('http://localhost:3100/tests'),
    ]);
    return [sitesData, testsData];
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

const TestTableItem = ({ test, site }) => {
  const getSiteClass = (siteId) => {
    const classMap = {
      1: 'pink',
      2: 'light-violet',
      default: 'violet',
    };
    return classMap[siteId] || classMap.default;
  };

  const getStatusClass = (status) => {
    const classMap = {
      DRAFT: 'grey',
      ONLINE: 'green',
      PAUSED: 'orange',
      default: 'red',
    };
    return classMap[status] || classMap.default;
  };

  return (
    <div key={test.id} className="table__item" tabIndex={test.id}>
      <div className={`table__item__info ${getSiteClass(site.id)}`} about="indicator"></div>
      <div className="table__item__info" about="name">{test.name}</div>
      <div className="table__item__info" about="type">{test.type}</div>
      <div className={`table__item__info ${getStatusClass(test.status)}`} about="status">{test.status}</div>
      <div className="table__item__info" about="site">{site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '') : "Unknown Site"}</div>
      <div className={`table__item__info ${test.status === "DRAFT" ? 'active' : 'disabled'}`} about="button">
        <button><span>{test.status === "DRAFT" ? 'Finalize' : 'Result'}</span></button>
      </div>
    </div>
  );
};

const TestTable = ({ testsData, sitesData, searchQuery }) => {
  const siteLookup = {};
  sitesData.forEach((site) => {
    siteLookup[site.id] = site;
  });

  const filteredTests = testsData.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table">
      {filteredTests.map((test) => {
        const site = siteLookup[test.siteId];
        return <TestTableItem key={test.id} test={test} site={site} />;
      })}
    </div>
  );
};

export const Navigation = ({ onSearch }) => (
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
            onChange={(e) => onSearch(e.target.value)}>
          </input>
          <button className="searchbar__field-info" type="button">7 tests</button>
        </div>
      </div>
    </div>
    <div className="navigation__info">
      <div className="textfield">
        <div className="textfield__item" about="name">Name</div>
        <div className="textfield__item" about="type">Type</div>
        <div className="textfield__item" about="status">Status</div>
        <div className="textfield__item" about="site">Site</div>
      </div>
    </div>
  </div>
);

export const Table = () => {
  const [testsData, setTestsData] = useState([]);
  const [sitesData, setSitesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDataForBoth().then(([sites, tests]) => {
      setSitesData(sites);
      setTestsData(tests);
    });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="table">
      <div className="table__wrapper">
        <Navigation onSearch={handleSearch} />
        <TestTable testsData={testsData} sitesData={sitesData} searchQuery={searchQuery} />
      </div>
    </div>
  );
};
