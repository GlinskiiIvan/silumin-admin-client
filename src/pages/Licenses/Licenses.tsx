import React from 'react';

import styles from './Licenses.module.scss';
import { Button } from 'react-bootstrap';
import { ROUTES } from '../../utils/constants';
import Record from '../../components/Record/Record';
import { NavLink } from 'react-router-dom';
import LayoutListRecords from '../../Layouts/LayoutListRecords/LayoutListRecords';

const Licenses: React.FC = () => {
    const records = [
        {
            id: 1,
            title: 'Лицензии'
        },
        {
            id: 2,
            title: 'Сертификаты'
        }
    ]

    const onDeleteHandler = (id: number) => {
        console.log(`delete record ${id}!`);
    }

    return (
        <LayoutListRecords title='Лицензии и сертификаты' buttonLink={ROUTES.LICENSES_CREATE_ROUTE} buttonText='Добавить категорию лицензии'>
            <>
                {records.map((item) => (
                    <Record key={item.id} title={item.title} editTo={ROUTES.LICENSES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                ))}
            </>
        </LayoutListRecords>
    );
};

export default Licenses;