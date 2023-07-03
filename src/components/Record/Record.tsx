import React, { InputHTMLAttributes } from 'react';

import styles from './Record.module.scss'

import {ReactComponent  as EditIcon} from '../../assets/icons/edit.svg';
import {ReactComponent  as DeleteIcon} from '../../assets/icons/delete.svg';

import { NavLink } from 'react-router-dom';

interface IProps extends InputHTMLAttributes<HTMLDivElement> {
    readonly title: string;
    readonly text?: string;
    readonly editTo?: string;
    readonly onDelete: any;
}

const Record: React.FC<IProps> = ({title, text, editTo, onDelete, ...otherProps}) => {
    return (
        <div className={styles.container} {...otherProps}>
            <div className={styles.info}>
                <p>{title}</p>
                {text && <span>{text}</span>}
            </div>
            <div className={styles.actions}>
                {editTo && (
                    <NavLink to={editTo}>
                        <EditIcon  className={styles.edit} />
                    </NavLink>
                )}
                <DeleteIcon className={styles.remove}  onClick={onDelete} />
            </div>
        </div>
    );
};

export default Record;