import PropTypes from 'prop-types';

export const NavigationItem = ({ label, handleArrowClick }) => (
    <div className={`title__item ${label.toLowerCase()}`}>
      <div className="title__item_container">
        <p className="title__name">{label}</p>
        <div className="title__arrows">
          <button className="title__arrow title__arrow_asc" onClick={() => handleArrowClick(label, 'asc')}></button> 
          <button className="title__arrow title__arrow_desc" onClick={() => handleArrowClick(label, 'desc')}></button>
        </div>
        </div>
    </div>
);

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};

