import PropTypes from 'prop-types';
import { NavigationItem } from './NavigationItem';
import { FIELDS_DASHBOARD } from './../helpers/constants';
import { searchIcon } from '../icons/search';

export const Navigation = ({ onChange, numTests, hasSearchResult, handleSortDashboardItems }) => (
    <div className="navigation">
      <div className="navigation__search">
        <div className="searchbar">
          <div className="searchbar__field">
              {searchIcon}
            <input
              autoComplete="off"
              className="searchbar__field-input"
              placeholder="What test are you looking for?"
              spellCheck="false"
              type="text"
              onChange={(e) => onChange(e.target.value)}
            />
            <div className="searchbar__field-info">
              {numTests} tests
            </div>
          </div>
        </div>
      </div>
      {hasSearchResult && (
        <div className="navigation__info">
          <div className="container">
            <NavigationItem label={FIELDS_DASHBOARD.name} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.type} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.status} handleSortDashboardItems={handleSortDashboardItems} />
            <NavigationItem label={FIELDS_DASHBOARD.site} handleSortDashboardItems={handleSortDashboardItems} />
          </div>
        </div>
      )}
    </div>
);

Navigation.propTypes = {
    onChange: PropTypes.func.isRequired,
    numTests: PropTypes.number.isRequired,
    hasSearchResult: PropTypes.bool.isRequired,
    handleSortDashboardItems: PropTypes.func.isRequired,
};
  