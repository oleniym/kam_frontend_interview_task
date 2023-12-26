import PropTypes from 'prop-types';
import { setSiteClass, setStatusClass } from './constants';

export const TableItem = ({ test, site }) => {
  return (
    <div key={test.id} className={`table__item ${setSiteClass(site.id)}`} tabIndex={test.id}>
      <div className={`table__item__info indicator ${setSiteClass(site.id)}`}></div>
      <div className="table__item__info name">{test.name}</div>
      <div className="table__item__info type">{test.type}</div>
      <div className={`table__item__info status ${setStatusClass(test.status)}`}>{test.status}</div>
      <div className={`table__item__info site`}>{site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '') : "Unknown Site"}</div>
      <div className={`table__item__info cta ${test.status === "DRAFT" ? 'disabled' : 'active'}`}>
        <button><span>{test.status === "DRAFT" ? 'Finalize' : 'Result'}</span></button>
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
