const LOGIN_ROUTE = '/login';

const USERS_ROUTE = '/users';
const USERS_CREATE_ROUTE = USERS_ROUTE + '/create';
const USERS_EDIT_ROUTE = USERS_ROUTE + '/edit';

const ROLES_ROUTE = '/roles';
const ROLES_CREATE_ROUTE = ROLES_ROUTE + '/create';
const ROLES_EDIT_ROUTE = ROLES_ROUTE + '/edit';

const LICENSES_ROUTE = '/licenses';
const LICENSES_CREATE_ROUTE = LICENSES_ROUTE + '/create';
const LICENSES_EDIT_ROUTE = LICENSES_ROUTE + '/edit';

const JOB_OPENINGS_ROUTE = '/job-openings';
const JOB_OPENINGS_CREATE_ROUTE = JOB_OPENINGS_ROUTE + '/create';
const JOB_OPENINGS_EDIT_ROUTE = JOB_OPENINGS_ROUTE + '/edit';

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
    USERS_CREATE_ROUTE,
    USERS_EDIT_ROUTE,
    ROLES_ROUTE,
    ROLES_CREATE_ROUTE,
    ROLES_EDIT_ROUTE
};

export const REACT_APP_API_URL= 'http://localhost:5001/';
export const REACT_APP_CLIENT_URL= 'http://localhost:3000/';