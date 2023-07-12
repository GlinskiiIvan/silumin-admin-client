import React from "react";
import { Button } from "react-bootstrap";

import styles from './LayoutActionRecord.module.scss';

interface IProps {
    title: string;
    actionText: string;
    action: any;
    children: React.ReactElement | null;
    isValid: boolean;
}

const LayoutActionRecord: React.FC<IProps> = ({title, actionText, action, children, isValid}) => {

    return (
        <div className={styles.wrapper}>
            <h1>{title}</h1>
            <div className={styles.container}>
                {children}
            </div>
            <Button disabled={isValid} variant='success' onClick={action}>{actionText}</Button>
        </div>
    )
}

export default LayoutActionRecord;