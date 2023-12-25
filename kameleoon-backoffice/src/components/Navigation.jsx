import PropTypes from 'prop-types';
import { NavigationItem } from './NavigationItem';
import { FIELDS_DASHBOARD } from './constants';
// import { serch.svg }

export const Navigation = ({ onChange, numTests, showNavigationInfo, handleArrowClick }) => (
    <div className="navigation">
      <div className="navigation__search">
        <div className="searchbar">
          <div className="searchbar__field">

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
      {showNavigationInfo && (
        <div className="navigation__info">
          <div className="title">
            <NavigationItem label={FIELDS_DASHBOARD.name} handleArrowClick={handleArrowClick} />
            <NavigationItem label={FIELDS_DASHBOARD.type} handleArrowClick={handleArrowClick} />
            <NavigationItem label={FIELDS_DASHBOARD.status} handleArrowClick={handleArrowClick} />
            <NavigationItem label={FIELDS_DASHBOARD.site} handleArrowClick={handleArrowClick} />
          </div>
        </div>
      )}
    </div>
);

Navigation.propTypes = {
    onChange: PropTypes.func.isRequired,
    numTests: PropTypes.number.isRequired,
    showNavigationInfo: PropTypes.bool.isRequired,
    handleArrowClick: PropTypes.func.isRequired,
};
  