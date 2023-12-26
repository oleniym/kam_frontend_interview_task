import { FIELDS_DASHBOARD } from './../constants';

const compareFields = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return 0;
};

const getFieldData = (test, item, sites) => {
  const getField = (field) => field.toLowerCase();

  switch (item) {
    case FIELDS_DASHBOARD.name:
      return getField(test.name);
    case FIELDS_DASHBOARD.type:
      return getField(test.type);
    case FIELDS_DASHBOARD.status:
      return getStatusOrder(test.status);
    case FIELDS_DASHBOARD.site:
      const site = sites.find((site) => site.id === test.siteId);
      return site ? getField(site.url.replace(/^(https?:\/\/)?(www\.)?/, '')) : '';
    default:
      return '';
  }
};

const getStatusOrder = (status) => {
  const order = {
    ONLINE: 1,
    PAUSED: 2,
    STOPPED: 3,
    DRAFT: 4,
  };
  return order[status] || 0;
};

const sortTests = (tests, item, direction, sites) => {
  const sortedTests = [...tests];

  sortedTests.sort((a, b) => {
    const fieldA = getFieldData(a, item, sites);
    const fieldB = getFieldData(b, item, sites);

    return direction === 'asc' ? compareFields(fieldA, fieldB) : compareFields(fieldB, fieldA);
  });

  return sortedTests;
};

export const sortAsc = (tests, item, sites) => sortTests(tests, item, 'asc', sites);
export const sortDesc = (tests, item, sites) => sortTests(tests, item, 'desc', sites);
