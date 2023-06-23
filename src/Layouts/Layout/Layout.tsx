import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

import styles from './Layout.module.scss'

const Layout: React.FC = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;