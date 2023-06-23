import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './LayoutListRecords.module.scss'
import { Button } from 'react-bootstrap';

interface IProps {
    children: React.ReactElement | null;
    title: string;
    buttonLink: string;
    buttonText: string;
}

const LayoutListRecords: React.FC<IProps> = ({title, buttonLink, buttonText, children}) => {
    return (
        <div className={styles.records}>
            <h1>{title}</h1>
            <div className={styles.list}>
                {children}
            </div>
            <NavLink to={buttonLink}>            
                <Button >{buttonText}</Button>
            </NavLink>
        </div>
    );
};

export default LayoutListRecords;