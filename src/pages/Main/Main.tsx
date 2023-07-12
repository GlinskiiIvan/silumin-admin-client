import React from 'react';

import styles from './Main.module.scss';

import logo from '../../assets/images/main-logo.png';

const Main: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <img src={logo} alt=""/>
            <h1>Админ паналь <span>Silumin Vostok</span></h1>
        </div>
    );
};

export default Main;