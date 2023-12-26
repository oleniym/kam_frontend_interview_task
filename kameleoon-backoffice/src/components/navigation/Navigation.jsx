import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { NavigationItem } from './NavigationItem';
import { FIELDS_DASHBOARD } from '../helpers/constants';
import { searchIcon } from '../icons/searchIcon';
import { NoResultScreen } from './NoResultScreen';

export const Navigation = ({ tests, onChange, numTests, hasSearchResult, handleSortDashboardItems, onResetSearch }) => {
  const hasTests = tests.length > 0;
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const inputResultText = 'tests';

  const handleResetSearch = () => {
    onResetSearch();
    if (inputRef.current) {
      setValue('');
    }
  }

  if (!hasTests) return null;

  return (
    <div className="navigation">
      <div className="navigation__search">
        <div className="searchbar">
          <div className="searchbar__field">
              {searchIcon}
            <input
              ref={inputRef}
              autoComplete="off"
              className="searchbar__field-input"
              placeholder="What test are you looking for?"
              spellCheck="false"
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              value={value}
            />
            <div className="searchbar__field-info">
              {numTests} {inputResultText}
            </div>
          </div>
        </div>
      </div>
      {hasSearchResult ? (
        <div className="navigation__info">
          <div className="container">
            <NavigationItem label={FIELDS_DASHBOARD.name} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.type} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.status} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.site} handleSortDashboardItems={handleSortDashboardItems} />
          </div>
        </div>
      ) : (
        <NoResultScreen onClick={handleResetSearch} />
      )}
    </div>
  );
};

Navigation.propTypes = {
    onChange: PropTypes.func.isRequired,
    numTests: PropTypes.number.isRequired,
    hasSearchResult: PropTypes.bool.isRequired,
    handleSortDashboardItems: PropTypes.func.isRequired,
    onResetSearch: PropTypes.func.isRequired,
};
  