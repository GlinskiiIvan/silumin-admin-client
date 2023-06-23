import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.scss'
import { ROUTES } from '../../utils/constants';

const Sidebar: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.USERS_ROUTE}>Пользователи</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.LICENSES_ROUTE}>Лицензии</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.JOB_OPENINGS_ROUTE}>Вакансии</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.NEWS_ROUTE}>Новости</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.PROJECTS_ROUTE}>Проекты</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.EMPLOYEES_ROUTE}>Сотрудники</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.CONTACTS_BRANCHES_ROUTE}>Филиалы</NavLink>
                </div>
        </div>
    );
};

export default Sidebar;