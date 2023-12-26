import PropTypes from 'prop-types';

export const NavigationItem = ({ label, handleSortDashboardItems }) => (
    <div className={`item ${label.toLowerCase()}`}>
      <div className="item_container">
        <p className="title">{label}</p>
        <div className="arrows">
          <button className="arrow arrow_asc" onClick={() => handleSortDashboardItems(label, 'asc')}></button> 
          <button className="arrow arrow_desc" onClick={() => handleSortDashboardItems(label, 'desc')}></button>
        </div>
        </div>
    </div>
);

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleSortDashboardItems: PropTypes.func.isRequired,
};

