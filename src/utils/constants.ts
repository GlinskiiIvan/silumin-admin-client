const LOGIN_ROUTE = '/login';
const USERS_ROUTE = '/users';

const LICENSES_ROUTE = '/licenses';
const LICENSES_CREATE_ROUTE = LICENSES_ROUTE + '/actions';
const LICENSES_EDIT_ROUTE = LICENSES_CREATE_ROUTE;

const JOB_OPENINGS_ROUTE = '/job-openings';
const JOB_OPENINGS_CREATE_ROUTE = JOB_OPENINGS_ROUTE + '/actions';
const JOB_OPENINGS_EDIT_ROUTE = JOB_OPENINGS_CREATE_ROUTE;

const NEWS_ROUTE = '/news';
const PROJECTS_ROUTE = '/projects';
const EMPLOYEES_ROUTE = '/employees';
const CONTACTS_BRANCHES_ROUTE = '/contacts-branches';
// const _ROUTE = '/';

export const ROUTES = {
    CONTACTS_BRANCHES_ROUTE,
    EMPLOYEES_ROUTE,
    JOB_OPENINGS_ROUTE,
    LICENSES_ROUTE,
    LOGIN_ROUTE,
    NEWS_ROUTE,
    PROJECTS_ROUTE,
    USERS_ROUTE,
    JOB_OPENINGS_CREATE_ROUTE,
    JOB_OPENINGS_EDIT_ROUTE,
    LICENSES_CREATE_ROUTE,
    LICENSES_EDIT_ROUTE,
};

export const REACT_APP_API_URL= 'http://localhost:5000/';
export const REACT_APP_CLIENT_URL= 'http://localhost:3000/';