import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

import styles from './Layout.module.scss'
import Header from "../../components/Header/Header";

const Layout: React.FC = () => {
    const [menuActive, setMenuActive] = React.useState(false);

    return (
        <div className={styles.container}>
            <Header menuActive={menuActive} setMenuActive={setMenuActive} />
            <Sidebar active={menuActive} setActive={setMenuActive} />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;