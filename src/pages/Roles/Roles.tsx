import React from 'react';

import styles from './Roles.module.scss';

import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";
import {useGetPokemonByNameQuery} from "../../store/services/pokemon";
import {rolesAPI} from "../../store/services/roles";
import {usersAPI} from "../../store/services/users";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";

const Roles: React.FC = () => {
    const {data = [], error, isLoading} = rolesAPI.useGetAllRolesQuery();

    const [removeRole, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = rolesAPI.useRemoveRoleMutation();

    const onDeleteHandler = async (id: number) => {
        await removeRole({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Роль успешно удалена!' />

            <LayoutListRecords title='Роли' buttonLink={ROUTES.ROLES_CREATE_ROUTE} buttonText='Добавить роль'>
                <>
                    {data.map((item) => (
                        <Record key={item.id} title={item.value} text={item.description} editTo={ROUTES.ROLES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                    ))}
                </>
            </LayoutListRecords>
        </>
    );
};

export default Roles;