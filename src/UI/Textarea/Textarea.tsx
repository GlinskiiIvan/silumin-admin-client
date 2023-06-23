import React, { InputHTMLAttributes } from 'react';

import styles from './Textarea.module.scss';

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
}

const Textarea: React.FC<IProps> = ({ ...otherProps}) => {
    return (
        <textarea className={styles.textarea} {...otherProps} />
    );
};

export default Textarea;