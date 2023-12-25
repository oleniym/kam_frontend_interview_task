import PropTypes from 'prop-types';
import { TableItem } from './TableItem';
import { NoResultScreen } from './NoResultScreen'

export const Table  = ({ tests, sites, searchQuery, onResetSearch }) => {
    // START: логика для поиска
    const siteLookup = {};
    sites.forEach((site) => {
      siteLookup[site.id] = site;
    });
    const filteredTests = tests.filter((test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const noResults = filteredTests.length === 0;
  
    const handleResetSearch = () => {
      onResetSearch();
      const searchInput = document.querySelector('.searchbar__field-input');
      if (searchInput) searchInput.value = '';
    };
    // END: логика для поиска
  
    if (tests.length === 0 || sites.length === 0) {
      return null;
    }
  
    return (
      <div className="table">
        {noResults ? (
          <NoResultScreen handleResetSearch={handleResetSearch} />
        ) : (
          filteredTests.map((test) => {
            const site = siteLookup[test.siteId];
            return <TableItem key={test.id} test={test} site={site} />;
          })
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