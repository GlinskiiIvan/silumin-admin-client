import React from 'react';

import styles from './Header.module.scss';
import {logoutThunk, selectUserData} from "../../store/slices/user";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {Button} from "react-bootstrap";

interface IProps {
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IProps> = ({menuActive, setMenuActive}) => {
    const user = useSelector(selectUserData);
    const dispatch = useDispatch<AppDispatch>();

    const logoutHandler = () => {
        dispatch(logoutThunk());
    }
    return (
        <div className={styles.wrapper}>
            <div onClick={() => setMenuActive(!menuActive)} className={menuActive ? `${styles.menu_btn} ${styles.active}` : styles.menu_btn}>
                <span></span>
            </div>

            <div className={styles.user}>
                <h3>{user?.name}</h3>
                <Button onClick={logoutHandler} variant='danger'>Выйти</Button>
            </div>
        </div>
    );
};

export default Header;