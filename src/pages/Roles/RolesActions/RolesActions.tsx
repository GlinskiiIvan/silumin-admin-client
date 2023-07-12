import React from 'react';

import  styles from './RolesActions.module.scss';
import Input from "../../../UI/Input/Input";
import MultipleSelect from "../../../UI/MultipleSelect/MultipleSelect";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useParams} from "react-router-dom";
import Textarea from "../../../UI/Textarea/Textarea";
import {rolesAPI} from "../../../store/services/roles";
import {usersAPI} from "../../../store/services/users";
import {useInput} from "../../../hooks/useInput";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";

const RolesActions: React.FC = () => {
    const params = useParams();

    const {data: usersData, isLoading: usersIsLoading, error: usersError} = usersAPI.useGetAllUsersQuery();
    const [roleTrigger, roleResult] = rolesAPI.useLazyGetOneRoleQuery();

    const [createRole, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = rolesAPI.useCreateRoleMutation();
    const [updateRole, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = rolesAPI.useUpdateRoleMutation();

    const value = useInput('', {isEmpty: true});
    const description = useInput('', {isEmpty: true});
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

    let users: string[] = usersData ? usersData?.map((item) => item.name) : [];

    React.useEffect(() => {
        if(params.id) {
            roleTrigger(+params.id);
            if(roleResult.data) {
                value.onSetValue(roleResult.data.value);
                description.onSetValue(roleResult.data.description);
                setSelectedUsers(roleResult.data.users.map((item) => item.name))
            }
        }
        if (createIsSuccess) {
            value.onReset()
            description.onReset()
            setSelectedUsers([])
        }
    }, [roleResult.data, createIsSuccess]);

    const actionHandler = async () => {
        if(params.id) {
            await updateRole({id: +params.id, value: value.value, description: description.value, users: JSON.stringify(selectedUsers)});
        } else {
            if(value && description) {
                await createRole({value: value.value, description: description.value, users: JSON.stringify(selectedUsers)});
            }
        }
    }

    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Роль успешно добавлена!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Роль успешно обновлена!' />

            <LayoutActionRecord
                title={`${params.id ? 'Редактирование' : 'Создание'} роли`}
                actionText={`${params.id ? 'Сохранить' : 'Создать'} роли`}
                action={actionHandler}
                isValid={!value.isValid || !description.isValid}>
                <>
                    <div>
                        <h3>Значение</h3>
                        <Input value={value.value} onChange={(e) => value.onChange(e)} onBlur={(e) => value.onBlur(e)} isDirty={value.isDirty} errors={value.errors} type="text" placeholder='Введите значение...' />
                    </div>
                    <div>
                        <h3>Описание</h3>
                        <Textarea value={description.value} onChange={(e) => description.onChange(e)} onBlur={(e) => description.onBlur(e)} isDirty={description.isDirty} errors={description.errors} type="text" placeholder='Введите описание...' />
                    </div>
                    <div>
                        <h3>Пользователи</h3>
                        {
                            usersIsLoading
                                ? <h1>Получение пользователей</h1>
                                : <MultipleSelect items={users} selectedItems={selectedUsers} setSelectedItems={setSelectedUsers} textBtn='Добавть пользователя' />
                        }
                    </div>
                </>
            </LayoutActionRecord>
        </>
    );
};

export default RolesActions;