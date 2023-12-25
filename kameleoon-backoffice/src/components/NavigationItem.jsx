import PropTypes from 'prop-types';

// тут убарть ап и даун
export const NavigationItem = ({ label, handleArrowClick }) => (
    <div className="title__item" data-name={label.toLowerCase()}>
      <div className="title__item_container">
        <p className="title__name">{label}</p>
        <div className="title__arrows">
          <button className="title__arrow title__arrow_up" onClick={() => handleArrowClick('up', label)}></button> 
          <button className="title__arrow title__arrow_down" onClick={() => handleArrowClick('down', label)}></button>
        </div>
        </div>
    </div>
);

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};

