import React from 'react';
import PropTypes from 'prop-types';
import { TableItem } from './TableItem';
import { NoResultScreen } from './NoResultScreen';

export const Table = ({ tests, sites, searchQuery, onResetSearch }) => {
  
  // START: the logic for the search
  const siteLookup = sites.reduce((acc, site) => {
    acc[site.id] = site;
    return acc;
  }, {});

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResetSearch = () => {
    onResetSearch();
    const searchInput = document.querySelector('.searchbar__field-input');
    if (searchInput) searchInput.value = '';
  };

  const noSearchResult = filteredTests.length === 0;
  // END: the logic for the search

  if (tests.length === 0 || sites.length === 0) {
    return null;
  }

  return (
    <div className="table">
      {noSearchResult ? (
        <NoResultScreen handleResetSearch={handleResetSearch} />
      ) : (
        filteredTests.map((test) => (
          <TableItem key={test.id} test={test} site={siteLookup[test.siteId]} />
        ))
      )}
    </div>
  );
};

Table.propTypes = {
  tests: PropTypes.array.isRequired,
  sites: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onResetSearch: PropTypes.func.isRequired,
};
