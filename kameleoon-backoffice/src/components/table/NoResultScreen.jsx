import PropTypes from 'prop-types';

export const NoResultScreen = ({ handleResetSearch }) => (
    <div className="no-result">
      <p className="no-result_text">Your search did not match any results</p>
      <button className="no-result_button" onClick={handleResetSearch}>Reset</button>
    </div>
);

NoResultScreen.propTypes = {
  handleResetSearch: PropTypes.func.isRequired,
};
