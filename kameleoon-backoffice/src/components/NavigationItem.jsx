import PropTypes from 'prop-types';

// тут убарть ап и даун
export const NavigationItem = ({ label, handleArrowClick }) => (
    <div className="textfield__item" data-name={label.toLowerCase()}>
      <div className="textfield__item_container">
        <p>{label}</p>
        <div className="textfield__arrow">
          <button className="textfield__arrow_up" onClick={() => handleArrowClick('up', label)}></button> 
          <button className="textfield__arrow_down" onClick={() => handleArrowClick('down', label)}></button>
        </div>
        </div>
    </div>
);

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};

