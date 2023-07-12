import React from 'react';
import styles from './Select.module.scss';

interface IProps {
    options: string[],
    initialValue?: string
    onChange?: any,
    variant: 'dark' | 'light' | 'dark-outline' | 'light-outline',
}

const Select: React.FC<IProps> = ({options,initialValue, variant, onChange}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState<string>(initialValue ? initialValue : options[0]);

    React.useEffect(() => {
        onChange(selectedOption);
    }, [selectedOption])

    const onSelectHandle = (item: any) => {
        setSelectedOption(item);
        setIsVisible(false);
    }

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title + ' ' + styles[variant]} onClick={() => toggleVisible()}>{selectedOption}</div>
            {isVisible &&
                <div className={styles.outside} onClick={() => setIsVisible(false)}></div>
            }
            <div className={styles.list + (isVisible ? ' ' + styles.visible : '')}>
                {options.map((item) =>
                    <div
                        className={styles.list__item + (item === selectedOption ? ' ' + styles.selected : '') + ' ' + styles[variant]}
                        onClick={() => onSelectHandle(item)}
                        key={item}
                    >
                        {item}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
