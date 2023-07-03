import React from 'react';
import styles from './MultipleSelect.module.scss';
import Record from "../../components/Record/Record";

import {ReactComponent  as SearchIcon} from '../../assets/icons/search.svg';

interface IProps {
    items: string[],
    selectedItems: string[],
    setSelectedItems: Function
}


const MultipleSelect: React.FC<IProps> = ({items, selectedItems, setSelectedItems}) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState('');

    const onSelectHandle = (item: string) => {
        setSelectedItems([...selectedItems, item])
        setSearchQuery('');
        setIsVisible(false);
    }

    const onRemoveSelectedItem = (item: any) => {
        setSelectedItems(selectedItems.filter((el) => el !== item));
    }

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    }

    const options = React.useMemo(() => {
        return items.filter(item => !selectedItems.includes(item));
    }, [selectedItems]);

    const searchedItems = React.useMemo(() => {
        return options.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, options])

  return (
    <div>
        <div className={styles.selectedItems}>
            <ul>
                {
                    selectedItems.length
                    ? selectedItems?.map((item) => (
                        <Record key={item} title={item} onDelete={() => onRemoveSelectedItem(item)} />
                    ))
                    : 'Элементы не выбраны. Для того что бы выбрать нажмите кнопку "Добавить роль"'
                }
            </ul>
        </div>

        <div className={styles.wrapper}>
            <div className={styles.title} onClick={() => toggleVisible()}>Добавить роль</div>
            {isVisible &&
                <div className={styles.outside} onClick={() => setIsVisible(false)}></div>
            }
            <div className={styles.list + (isVisible ? ' ' + styles.visible : '')}>

                <div className={styles.search}>
                    <input
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder='Поиск...'
                    />
                    <SearchIcon />
                </div>

                <div className={styles.list__container}>
                    {searchedItems.map((item) =>
                        <div
                            className={styles.list__item}
                            onClick={() => onSelectHandle(item)}
                            key={item}
                        >
                            {item}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default MultipleSelect;
