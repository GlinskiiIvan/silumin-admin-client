import React, { InputHTMLAttributes } from 'react';

import styles from './Textarea.module.scss';
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    readonly isDirty: boolean;
    readonly errors: string[];
}

const Textarea: React.FC<IProps> = ({isDirty, errors, ...otherProps}) => {
    return (
        <>
            <textarea className={styles.textarea} {...otherProps} />
            <InputErrorMessage isDirty={isDirty} errors={errors} />
        </>
    );
};

export default Textarea;