import React, { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss'

import {ReactComponent  as DeleteIcon} from '../../assets/icons/delete.svg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    readonly onDelete?: any;
}

const Input: React.FC<IProps> = ({onDelete, ...otherProps}) => {
    return (
        <div className={styles.container}>
            <input {...otherProps} />
            {
                onDelete && <DeleteIcon onClick={onDelete} />
            }
        </div>
    );
};

export default Input;