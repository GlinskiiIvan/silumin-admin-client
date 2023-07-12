import React, {InputHTMLAttributes} from 'react';

import styles from "./InputDate.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
}

const InputDate: React.FC<IProps> = ({...mainProps}) => {
    return (
        <input className={styles.inputDate} type='date'  {...mainProps} />
    );
};

export default InputDate;