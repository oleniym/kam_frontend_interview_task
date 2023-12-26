import PropTypes from 'prop-types';

const resultText = 'Your search did not match any results';
const reset = 'Reset';

export const NoResultScreen = ({ onClick }) => (
    <div className="no-result">
      <p className="no-result_text">{resultText}</p>
      <button className="no-result_button" onClick={onClick}>{reset}</button>
    </div>
);

NoResultScreen.propTypes = { 
  onClick: PropTypes.func.isRequired,
};