export const FIELDS_DASHBOARD = {
    name: 'Name',
    type: 'Type',
    status: 'Status',
    site: 'Site'
}

const classDataSite = {
    1: 'pink',
    2: 'light-violet',
    default: 'violet',
};

const classDataStatus = {
    DRAFT: 'grey',
    ONLINE: 'green',
    PAUSED: 'orange',
    default: 'red',
};

export const setSiteClass = (siteId) => {
    return classDataSite[siteId] || classDataSite.default;
};

export const setStatusClass = (status) => {
    return classDataStatus[status] || classDataStatus.default;
};
