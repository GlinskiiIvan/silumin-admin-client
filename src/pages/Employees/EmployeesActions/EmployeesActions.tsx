import React from 'react';
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import Input from "../../../UI/Input/Input";
import {useParams} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import MultipleInputSelect, {IMultipleInputSimpleSelect} from "../../../components/MultipleInputSelect/MultipleInputSelect";
import {employeesAPI} from "../../../store/services/employees";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";

const EmployeesActions: React.FC = () => {
    const {id} = useParams();

    const [trigger, result] = employeesAPI.useLazyGetOneEmployeeQuery();
    const [create, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = employeesAPI.useCreateEmployeeMutation();
    const [update, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = employeesAPI.useUpdateEmployeeMutation();

    const last_name = useInput('', {isEmpty: true});
    const first_name = useInput('', {isEmpty: true});
    const patronymic = useInput('', {isEmpty: true});
    const position = useInput('', {isEmpty: true});
    const [contacts, setContacts] = React.useState<IMultipleInputSimpleSelect[]>([]);

    const isValid = !last_name.isValid || !first_name.isValid || !patronymic.isValid || !position.isValid || !contacts.every((item) => item.value && item.type);

    React.useEffect(() => {
        if(id) {
            trigger(+id);
            if(result.data) {
                last_name.onSetValue(result.data.last_name);
                first_name.onSetValue(result.data.first_name);
                patronymic.onSetValue(result.data.patronymic);
                position.onSetValue(result.data.position);
                setContacts(result.data.contacts.map((item) => ({...item, id: Math.random()})))
            }
        }

        if (createIsSuccess) {
            last_name.onReset();
            first_name.onReset();
            patronymic.onReset();
            position.onReset();
            setContacts([]);
        }
    }, [result.data, createIsSuccess]);

    const actionUserHandler = async () => {
        const body = {
            last_name: last_name.value,
            first_name: first_name.value,
            patronymic: patronymic.value,
            position: position.value,
            contacts: JSON.stringify(contacts.map(item => ({value: item.value, type: item.type})))
        }
        if(id) {
            await update({id: +id, ...body});
        } else {
            await create(body);
        }
    }

    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Сотрудник успешно добавлен!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Сотрудник успешно обновлен!' />

            <LayoutActionRecord
                title={`${id ? 'Редактирование' : 'Создание'} должности`}
                actionText={`${id ? 'Сохранить' : 'Создать'} должность`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Фамилия</h3>
                        <Input value={last_name.value} onChange={(e) => last_name.onChange(e)} onBlur={(e) => last_name.onBlur(e)} isDirty={last_name.isDirty} errors={last_name.errors} type="text" placeholder='Введите фамилию....' />
                    </div>
                    <div>
                        <h3>Имя</h3>
                        <Input value={first_name.value} onChange={(e) => first_name.onChange(e)} onBlur={(e) => first_name.onBlur(e)} isDirty={first_name.isDirty} errors={first_name.errors} type="text" placeholder='Введите имя...' />
                    </div>
                    <div>
                        <h3>Отчество</h3>
                        <Input value={patronymic.value} onChange={(e) => patronymic.onChange(e)} onBlur={(e) => patronymic.onBlur(e)} isDirty={patronymic.isDirty} errors={patronymic.errors} type="text" placeholder='Введите отчество...' />
                    </div>
                    <div>
                        <h3>Должность</h3>
                        <Input value={position.value} onChange={(e) => position.onChange(e)} onBlur={(e) => position.onBlur(e)} isDirty={position.isDirty} errors={position.errors} type="text" placeholder='Введите должность...' />
                    </div>
                    <div>
                        <h3>Контакты</h3>
                        <MultipleInputSelect options={['Телефон', 'Почта', 'ВК']} items={contacts} setItems={setContacts} placeholderInput='Введите значение контанкта' emptyText='Контактов нет! Для того что бы добавить контакты нажмите кнокну ниже "Добавить контакт"' btnAddText='Добавить контакт' />
                    </div>
                </>
            </LayoutActionRecord>
        </>
    );
};

export default EmployeesActions;