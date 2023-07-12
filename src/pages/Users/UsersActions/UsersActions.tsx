import React from 'react';
import Input from "../../../UI/Input/Input";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useParams} from "react-router-dom";

import MultipleSelect from "../../../UI/MultipleSelect/MultipleSelect";

import {usersAPI} from "../../../store/services/users";
import {rolesAPI} from "../../../store/services/roles";

import {useInput} from "../../../hooks/useInput";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";

const UsersActions: React.FC = () => {
    const params = useParams();

    const [userTrigger, userResult] = usersAPI.useLazyGetOneUserQuery();
    const {data: rolesData, isLoading: rolesIsLoading} = rolesAPI.useGetAllRolesQuery();

    const [createUser, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = usersAPI.useCreateUserMutation();
    const [updateUser, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = usersAPI.useUpdateUserMutation();

    const name = useInput('', {isEmpty: true});
    const password = useInput('', {isEmpty: true, minLength: 4, maxLength: 16, isPassword: true});
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

    let roles: string[] = rolesData ? rolesData?.map((item) => item.value) : [];

    React.useEffect(() => {
        if(params.id) {
            userTrigger(+params.id);
            if(userResult.data) {
                name.onSetValue(userResult.data.name)
                setSelectedRoles(userResult.data.roles.map((item) => item.value))
            }
        }

        if (createIsSuccess) {
            name.onReset()
            password.onReset()
            setSelectedRoles([])
        }
    }, [userResult.data, createIsSuccess]);

    const actionUserHandler = async () => {
        if(params.id) {
            await  updateUser({id: +params.id, name: name.value, password: password.value ? password.value : undefined, roles: JSON.stringify(selectedRoles)});
        } else {
            if(name && password) {
                await createUser({name: name.value, password: password.value, roles: JSON.stringify(selectedRoles)});
            }
        }
    }

    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Пользователь успешно добавлен!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Пользователь успешно обновлен!' />

            <LayoutActionRecord
                title={`${params.id ? 'Редактирование' : 'Создание'} пользователя`}
                actionText={`${params.id ? 'Сохранить' : 'Создать'} пользователя`}
                action={actionUserHandler}
                isValid={!name.isValid || !password.isValid} >
                <>
                    <div>
                        <h3>Имя</h3>
                        <Input value={name.value} onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} isDirty={name.isDirty} errors={name.errors} type="text" placeholder='Введите имя...' />
                    </div>
                    <div>
                        <h3>Пароль</h3>
                        <Input value={password.value} onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} isDirty={password.isDirty} errors={password.errors} type="password" placeholder='Введите пароль...' />
                    </div>
                    <div>
                        <h3>Роли</h3>
                        {
                            rolesIsLoading
                                ? <h1>Получение ролей...</h1>
                                : <MultipleSelect items={roles} selectedItems={selectedRoles} setSelectedItems={setSelectedRoles} textBtn='Добавить роль' />
                        }
                    </div>
                </>
            </LayoutActionRecord>
        </>
    );
};

export default UsersActions;