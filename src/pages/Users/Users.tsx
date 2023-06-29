import React from 'react';

import styles from './Users.module.scss';
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";

const Users: React.FC = () => {
    const records = [
        {
            id: 1,
            name: 'User 1'
        },
        {
            id: 2,
            name: 'User admin'
        },
        {
            id: 3,
            name: 'USer super admin'
        },
    ]

    const onDeleteHandler = (id: number) => {
        console.log(`delete record ${id}!`);
    }

    return (
        <LayoutListRecords title='Пользователи' buttonLink={ROUTES.USERS_CREATE_ROUTE} buttonText='Добавить пользователя'>
            <>
                {records.map((item) => (
                    <Record key={item.id} title={item.name} editTo={ROUTES.USERS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                ))}
            </>
        </LayoutListRecords>
    );
};

export default Users;