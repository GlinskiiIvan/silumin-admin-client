import React from 'react';

import styles from './Users.module.scss';
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";
import {usersAPI} from "../../store/services/users";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";

const Users: React.FC = () => {

    const {data = [], error, isLoading} = usersAPI.useGetAllUsersQuery();
    const [removeUser, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = usersAPI.useRemoveUserMutation();

    const onDeleteHandler = async (id: number) => {
        await removeUser({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Пользователь успешно удален!' />

            <LayoutListRecords title='Пользователи' buttonLink={ROUTES.USERS_CREATE_ROUTE} buttonText='Добавить пользователя'>
                <>
                    {data.map((item) => (
                        <Record key={item.id} title={item.name} editTo={ROUTES.USERS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                    ))}
                </>
            </LayoutListRecords>
        </>
    );
};

export default Users;