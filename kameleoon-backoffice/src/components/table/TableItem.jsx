import PropTypes from 'prop-types';
import { setSiteClass, setStatusClass } from '../helpers/constants';

export const TableItem = ({ test, site }) => {
  return (
    <div key={test.id} className={`cell ${setSiteClass(site.id)}`} tabIndex={test.id}>
      <div className={`cell__info indicator ${setSiteClass(site.id)}`}></div>
      <div className="cell__info name">{test.name}</div>
      <div className="cell__info type">{test.type}</div>
      <div className={`cell__info status ${setStatusClass(test.status)}`}>{test.status}</div>
      <div className={`cell__info site`}>{site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '') : "Unknown Site"}</div>
      <div className={`cell__info info ${test.status === "DRAFT" ? 'disabled' : 'active'}`}> 
        <button className="button"><span className="span">{test.status === "DRAFT" ? 'Finalize' : 'Result'}</span></button>
      </div>
    </div>
  );
};

TableItem.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    siteId: PropTypes.number.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }),
};
