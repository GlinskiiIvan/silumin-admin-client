import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../utils/constants';
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, selectUserData} from "../../store/slices/user";
import {Button} from "react-bootstrap";
import {AppDispatch} from "../../store/store";

import styles from './Sidebar.module.scss'

interface IProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<IProps> = ({active, setActive}) => {
    const user = useSelector(selectUserData);
    const requiredRoles = ['Super'];

    return (
        <div className={active ? `${styles.wrapper} ${styles.active}` : styles.wrapper} onClick={() => setActive(false)}>
            <div className={styles.blur} />
            <div className={styles.container}>
                {user && user.roles.some(role => requiredRoles.includes(role.value)) && (
                    <>
                        <NavLink className={({isActive}) => (isActive ? styles.active : '')}
                                 to={ROUTES.ROLES_ROUTE}>Роли</NavLink>
                        <NavLink className={({isActive}) => (isActive ? styles.active : '')}
                                 to={ROUTES.USERS_ROUTE}>Пользователи</NavLink>
                    </>
                )}
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.LICENSES_ROUTE}>Лицензии</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.REQUIREMENTS_ROUTE}>Требования</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.JOB_OPENINGS_ROUTE}>Вакансии</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.NEWS_ROUTE}>Новости</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.EMPLOYEES_ROUTE}>Сотрудники</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={ROUTES.CONTACTS_BRANCHES_ROUTE}>Филиалы</NavLink>
            </div>
        </div>
    );
};

export default Sidebar;