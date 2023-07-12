import React from 'react';
import { Button } from 'react-bootstrap';

import styles from './JobOpeningsActions.module.scss';

import Input from '../../../UI/Input/Input';
import { useParams } from 'react-router-dom';
import LayoutActionRecord from '../../../Layouts/LayoutActionRecord/LayoutActionRecord';
import Textarea from '../../../UI/Textarea/Textarea';
import {useInput} from "../../../hooks/useInput";
import {jobOpeningsAPI} from "../../../store/services/job-openings";
import MultipleSelect from "../../../UI/MultipleSelect/MultipleSelect";
import {requirementsAPI} from "../../../store/services/requirements";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";
import MultipleInput, {IMultipleInput} from "../../../components/MultipleInput/MultipleInput";

interface ICondition {
    id: number;
    value: string;
}

const JobOpeningsActions: React.FC = () => {
    const {id} = useParams();

    const [trigger, result] = jobOpeningsAPI.useLazyGetOneJobOpeningQuery();
    const {data: requirementsData, isLoading: requirementsIsLoading, error: requirementsError} = requirementsAPI.useGetAllRequirementsQuery();
    const [create, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = jobOpeningsAPI.useCreateJobOpeningMutation();
    const [update, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = jobOpeningsAPI.useUpdateJobOpeningMutation();

    const name = useInput('', {isEmpty: true});
    const description = useInput('', {isEmpty: true});
    const [selectedRequirements, setSelectedRequirements] = React.useState<string[]>([]);
    const [duties, setDuties] = React.useState<IMultipleInput[]>([]);

    let requirements: string[] = requirementsData ? requirementsData?.map((item) => item.value) : [];
    
    const isValid = !name.isValid || !description.isValid || !selectedRequirements || !duties;

    React.useEffect(() => {
        if(id) {
            trigger(+id);
            if(result.data) {
                name.onSetValue(result.data.name);
                description.onSetValue(result.data.description ? result.data.description : '');
                setDuties(result.data.duties);
                setSelectedRequirements(result.data.requirements.map((item) => item.value));
            }
        }

        if (createIsSuccess) {
            name.onReset();
            description.onReset();
            setSelectedRequirements([]);
            setDuties([]);
        }
        if(updateIsSuccess) {
        }
    }, [result.data, createIsSuccess, updateIsSuccess]);

    const actionUserHandler = async () => {
        if(id) {
            await update({
                id: +id,
                name: name.value,
                description: description.value,
                requirements: JSON.stringify(selectedRequirements),
                duties: JSON.stringify(duties.map((item) => item.value)),
            });
        } else {
            await create({
                name: name.value,
                description: description.value,
                requirements: JSON.stringify(selectedRequirements),
                duties: JSON.stringify(duties.map((item) => item.value))
            });
        }
    }
    
    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Вакансия успешно добавлена!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Вакансия успешно обновлена!' />

            <LayoutActionRecord
                title={`${id ? 'Редактирование' : 'Создание'} вакансии`}
                actionText={`${id ? 'Сохранить' : 'Создать'} вакансию`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Название</h3>
                        <Input value={name.value} onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} isDirty={name.isDirty} errors={name.errors} type="text" placeholder='Введите название...' />
                    </div>
                    <div>
                        <h3>Описание</h3>
                        <Textarea value={description.value} onChange={(e) => description.onChange(e)} onBlur={(e) => description.onBlur(e)} isDirty={description.isDirty} errors={description.errors} name='description' placeholder='Введите описание...' />
                    </div>
                    <div className={`${styles.option}`}>
                        <h3>Требования</h3>
                        {
                            requirementsIsLoading
                                ? <p>Получение требований</p>
                                : <MultipleSelect items={requirements} selectedItems={selectedRequirements} setSelectedItems={setSelectedRequirements} textBtn='Добавить требование' />
                        }
                    </div>
                    <div className={`${styles.option}`}>
                        <h3>Обязанности</h3>
                        <MultipleInput items={duties} setItems={setDuties} placeholderInput={'Введите обязанность...'} emptyText={'Обязанности не прописаны! Для того что бы добавить требования нажмите кнокну ниже "Добавить обязанность"'} btnAddText={'Добавить обязанность'} />
                    </div>
                </>
            </LayoutActionRecord>
        </>
    );
};

export default JobOpeningsActions;