import React from 'react';
import Input from "../../UI/Input/Input";
import styles from "../../pages/JobOpenings/JobOpeningsActions/JobOpeningsActions.module.scss";
import {Button} from "react-bootstrap";

export interface IMultipleInput {
    id: number;
    value: string;
}

interface IProps {
    items: IMultipleInput[]
    setItems: any,
    placeholderInput: string,
    emptyText: string,
    btnAddText: string,
}

const MultipleInput: React.FC<IProps> = ({items, setItems, placeholderInput, emptyText, btnAddText}) => {

    const addItem = () => {
        setItems([...items, {id: Math.random(), value: ''}]);
    }
    const changeItem = (id: number, value: string) => {
        setItems(items.map(item => item.id === id ? {...item, value} : item));
    }
    const removeItem = (id: number) => {
        setItems(items.filter((item) => item?.id !== id));
    };
    
    return (
        <>
            <div className={styles.option__list}>
                {!items.length && <p>{emptyText}</p>}
                {items.map((item) => (
                    <Input
                        key={item.id}
                        value={item.value}
                        onChange={e => changeItem(item.id, e.target.value)}
                        type="text"
                        placeholder={placeholderInput}
                        onDelete={() => removeItem(item.id)} />
                ))}
            </div>
            <Button onClick={addItem}>{btnAddText}</Button>
        </>
    );
};

export default MultipleInput;