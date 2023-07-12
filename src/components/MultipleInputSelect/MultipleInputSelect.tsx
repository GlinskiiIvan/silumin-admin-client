import React from 'react';
import Input from "../../UI/Input/Input";
import styles from "./MultipleInputSelect.module.scss";
import {Button} from "react-bootstrap";
import Select from "../../UI/Select/Select";

import {ReactComponent  as DeleteIcon} from '../../assets/icons/delete.svg';

export interface IMultipleInputSimpleSelect {
    id: number;
    value: string;
    type: string;
}

interface IProps {
    options: string[],
    items: IMultipleInputSimpleSelect[]
    setItems: any,
    placeholderInput: string,
    emptyText: string,
    btnAddText: string,
}

const MultipleInputSimpleSelect: React.FC<IProps> = ({options, items, setItems, placeholderInput, emptyText, btnAddText}) => {

    // const [selectedOption, setSelectedOption] = React.useState(options[0]);

    const addItem = () => {
        console.log(options)
        setItems([...items, {id: Math.random(), value: '', type: ''}]);
    }
    const changeItem = (id: number, key: string, value: string) => {
        setItems(items.map(item => item.id === id ? {...item, [key]: value} : item));
    }
    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <>
            <div className={styles.wrapper}>
                {!items.length && <p>{emptyText}</p>}
                {items.map((item) => (
                    <div className={styles.actions}>
                        <Input
                            key={item.id}
                            value={item.value}
                            onChange={e => changeItem(item.id, 'value', e.target.value)}
                            type="text"
                            placeholder={placeholderInput} />
                        <Select initialValue={item.type} options={options} onChange={(value: string) => changeItem(item.id, 'type', value)} variant='dark' />
                        <DeleteIcon onClick={() => removeItem(item.id)} />
                    </div>

                ))}
            </div>
            <Button onClick={addItem}>{btnAddText}</Button>
        </>
    );
};

export default MultipleInputSimpleSelect;