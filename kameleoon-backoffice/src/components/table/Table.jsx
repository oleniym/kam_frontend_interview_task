import React from 'react';
import PropTypes from 'prop-types';
import { TableItem } from './TableItem';

export const Table = ({ tests, sites, searchQuery }) => {

  const siteLookup = sites.reduce((acc, site) => {
    acc[site.id] = site;
    return acc;
  }, {});

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (tests.length === 0 || sites.length === 0) {
    return null;
  }

  return (
    <div className="table">
      {filteredTests.map((test) => (
        <TableItem key={test.id} test={test} site={siteLookup[test.siteId]} />
      ))}
    </div>
  );
};

Table.propTypes = {
  tests: PropTypes.array.isRequired,
  sites: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
