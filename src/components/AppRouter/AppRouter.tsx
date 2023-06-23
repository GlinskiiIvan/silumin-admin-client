import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from '../../Layouts/Layout/Layout';
import { ROUTES } from '../../utils/constants';
import Login from '../../pages/Login/Login';
import Users from '../../pages/Users/Users';
import Licenses from '../../pages/Licenses/Licenses';
import News from '../../pages/News/News';
import Projects from '../../pages/Projects/Projects';
import Employees from '../../pages/Employees/Employees';
import ContactsBranches from '../../pages/ContactsBranches/ContactsBranches';
import JobOpenings from '../../pages/JobOpenings/JobOpenings';
import JobOpeningsActions from '../../pages/JobOpeningsActions/JobOpeningsActions';
import LicensesActions from '../../pages/LicensesActions/LicensesActions';

const AppRouter: React.FC = () => {
    const isAuth = true;

    return (
        <Routes>
            <Route path='/' element={ <Layout /> }>
                <Route path={ROUTES.LOGIN_ROUTE} element={<Login></Login>} />
                <Route path={ROUTES.USERS_ROUTE} element={<Users></Users>} />

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
        </Routes>
    );
};

export default AppRouter;