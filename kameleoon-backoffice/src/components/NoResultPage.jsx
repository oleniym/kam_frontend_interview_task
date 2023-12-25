import PropTypes from 'prop-types';

export const NoResultsPage = ({ handleResetSearch }) => (
    <div className="no-results">
      <p>Your search did not match any results</p>
      <button onClick={handleResetSearch}>Reset</button>
    </div>
);

NoResultsPage.propTypes = {
  handleResetSearch: PropTypes.func.isRequired,
};
