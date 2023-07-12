import React from 'react';
import {useParams} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import MultipleInputSelect, {IMultipleInputSimpleSelect} from "../../../components/MultipleInputSelect/MultipleInputSelect";
import {contactsBranchesAPI} from "../../../store/services/contactsBranches";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import Input from "../../../UI/Input/Input";

const ContactsBranchesActions: React.FC = () => {
    const {id} = useParams();

    const [trigger, result] = contactsBranchesAPI.useLazyGetOneContactsBranchesQuery();
    const [create, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = contactsBranchesAPI.useCreateContactsBranchesMutation();
    const [update, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = contactsBranchesAPI.useUpdateContactsBranchesMutation();

    const city = useInput('', {isEmpty: true});
    const name = useInput('', {isEmpty: true});
    const address = useInput('', {isEmpty: true});
    const [contacts, setContacts] = React.useState<IMultipleInputSimpleSelect[]>([]);

    const isValid = !city.isValid || !name.isValid || !address.isValid || !contacts.every((item) => item.value && item.type);

    React.useEffect(() => {
        if(id) {
            trigger(+id);
            if(result.data) {
                city.onSetValue(result.data.city);
                name.onSetValue(result.data.name);
                address.onSetValue(result.data.address);
                setContacts(result.data.contacts.map((item) => ({...item, id: Math.random()})))
            }
        }

        if (createIsSuccess) {
            city.onReset();
            name.onReset();
            address.onReset();
            setContacts([]);
        }
    }, [result.data, createIsSuccess]);

    const actionUserHandler = async () => {
        const body = {
            city: city.value,
            name: name.value,
            address: address.value,
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
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Филиал успешно добавлен!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Филиал успешно обновлен!' />

            <LayoutActionRecord
                title={`${id ? 'Редактирование' : 'Создание'} филиала`}
                actionText={`${id ? 'Сохранить' : 'Создать'} филиал`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Название</h3>
                        <Input value={name.value} onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} isDirty={name.isDirty} errors={name.errors} type="text" placeholder='Введите название...' />
                    </div>
                    <div>
                        <h3>Город</h3>
                        <Input value={city.value} onChange={(e) => city.onChange(e)} onBlur={(e) => city.onBlur(e)} isDirty={city.isDirty} errors={city.errors} type="text" placeholder='Введите город....' />
                    </div>
                    <div>
                        <h3>Адрес</h3>
                        <Input value={address.value} onChange={(e) => address.onChange(e)} onBlur={(e) => address.onBlur(e)} isDirty={address.isDirty} errors={address.errors} type="text" placeholder='Введите адрес...' />
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

export default ContactsBranchesActions;