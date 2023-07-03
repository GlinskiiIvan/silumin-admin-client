import React from 'react';

import styles from './Roles.module.scss';
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";

const Roles: React.FC = () => {
    // const {} = rolesAPI.

    const records = [
        {
            id: 1,
            value: 'Super',
            description: 'description bla bla bla'
        },
        {
            id: 2,
            value: 'User',
            description: 'description bla bla bla'
        },
        {
            id: 3,
            value: 'Admin',
            description: 'description bla bla bla'
        },
    ]

    const onDeleteHandler = (id: number) => {
        console.log(`delete record ${id}!`);
    }

    return (
        <LayoutListRecords title='Роли' buttonLink={ROUTES.ROLES_CREATE_ROUTE} buttonText='Добавить роль'>
            <>
                {records.map((item) => (
                    <Record key={item.id} title={item.value} text={item.description} editTo={ROUTES.ROLES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                ))}
            </>
        </LayoutListRecords>
    );
};

export default Roles;