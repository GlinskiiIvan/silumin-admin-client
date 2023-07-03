import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from '../../Layouts/Layout/Layout';
import Login from '../../pages/Login/Login';
import Users from '../../pages/Users/Users';
import Licenses from '../../pages/Licenses/Licenses';
import News from '../../pages/News/News';
import Projects from '../../pages/Projects/Projects';
import Employees from '../../pages/Employees/Employees';
import ContactsBranches from '../../pages/ContactsBranches/ContactsBranches';
import JobOpenings from '../../pages/JobOpenings/JobOpenings';
import JobOpeningsActions from '../../pages/JobOpenings/JobOpeningsActions/JobOpeningsActions';
import LicensesActions from '../../pages/Licenses/LicensesActions/LicensesActions';

import { ROUTES } from '../../utils/constants';
import UsersActions from "../../pages/Users/UsersActions/UsersActions";
import Roles from "../../pages/Roles/Roles";
import RolesActions from "../../pages/Roles/RolesActions/RolesActions";

const AppRouter: React.FC = () => {
    const isAuth = true;

    return (
        <Routes>
            {!isAuth && (
                <Route path={'/'} element={<Login></Login>} />
            )}
            {isAuth && (
                <Route path='/' element={ <Layout /> }>
                    <Route path={ROUTES.ROLES_ROUTE} element={<Roles></Roles>} />
                    <Route path={ROUTES.ROLES_CREATE_ROUTE} element={<RolesActions></RolesActions>} />
                    <Route path={ROUTES.ROLES_EDIT_ROUTE + '/:id'} element={<RolesActions></RolesActions>} />

                    <Route path={ROUTES.USERS_ROUTE} element={<Users></Users>} />
                    <Route path={ROUTES.USERS_CREATE_ROUTE} element={<UsersActions></UsersActions>} />
                    <Route path={ROUTES.USERS_EDIT_ROUTE + '/:id'} element={<UsersActions></UsersActions>} />

                    <Route path={ROUTES.LICENSES_ROUTE} element={<Licenses></Licenses>} />
                    <Route path={ROUTES.LICENSES_CREATE_ROUTE} element={<LicensesActions></LicensesActions>} />
                    <Route path={ROUTES.LICENSES_EDIT_ROUTE  + '/:id'} element={<LicensesActions></LicensesActions>} />

                    <Route path={ROUTES.JOB_OPENINGS_ROUTE} element={<JobOpenings></JobOpenings>} />
                    <Route path={ROUTES.JOB_OPENINGS_CREATE_ROUTE} element={<JobOpeningsActions></JobOpeningsActions>} />
                    <Route path={ROUTES.JOB_OPENINGS_EDIT_ROUTE + '/:id'} element={<JobOpeningsActions></JobOpeningsActions>} />

                    <Route path={ROUTES.NEWS_ROUTE} element={<News></News>} />
                    <Route path={ROUTES.PROJECTS_ROUTE} element={<Projects></Projects>} />
                    <Route path={ROUTES.EMPLOYEES_ROUTE} element={<Employees></Employees>} />
                    <Route path={ROUTES.CONTACTS_BRANCHES_ROUTE} element={<ContactsBranches></ContactsBranches>} />
                </Route>
            )}
        </Routes>
    );
};

export default AppRouter;