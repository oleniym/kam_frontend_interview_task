import PropTypes from 'prop-types';
import { setSiteClass, setStatusClass } from './constants';

export const TableItem = ({ test, site }) => {
    return (
      <div key={test.id} className="table__item" tabIndex={test.id}>
        <div className={`table__item__info ${setSiteClass(site.id)}`} data-name="indicator"></div>
        <div className="table__item__info" data-name="name">{test.name}</div>
        <div className="table__item__info" data-name="type">{test.type}</div>
        <div className={`table__item__info ${setStatusClass(test.status)}`} data-name="status">{test.status}</div>
        <div className="table__item__info" data-name="site">{site ? site.url.replace(/^(https?:\/\/)?(www\.)?/, '') : "Unknown Site"}</div>
        <div className={`table__item__info ${test.status === "DRAFT" ? 'active' : 'disabled'}`} data-name="button">
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