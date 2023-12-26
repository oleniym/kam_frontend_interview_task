import PropTypes from 'prop-types';

export const NoResultScreen = ({ onClick }) => (
    <div className="no-result">
      <p className="no-result_text">Your search did not match any results</p>
      <button className="no-result_button" onClick={onClick}>Reset</button>
    </div>
);

NoResultScreen.propTypes = { 
  onClick: PropTypes.func.isRequired,
};