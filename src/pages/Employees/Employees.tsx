import React from 'react';

import styles from './Employees.module.scss';
import {jobOpeningsAPI} from "../../store/services/job-openings";
import {employeesAPI} from "../../store/services/employees";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";

const Employees: React.FC = () => {
    const {data = [], error, isLoading} = employeesAPI.useGetAllEmployeesQuery();
    const [remove, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = employeesAPI.useRemoveEmployeeMutation();

    const onDeleteHandler = async (id: number) => {
        await remove({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Сотрудник успешно удален!' />

            <LayoutListRecords title='Сотрудники' buttonLink={ROUTES.EMPLOYEES_CREATE_ROUTE} buttonText='Добавить сотрудника'>
                <>
                    {
                        isLoading
                            ? <h3>Получение сотрудников...</h3>
                            : data.length > 0
                                ? data.map((item) => (
                                    <Record key={item.id} title={`${item.last_name} ${item.first_name} ${item.patronymic}`} text={item.position} editTo={ROUTES.EMPLOYEES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                                ))
                                : <h3>Сотрудники не найдены...</h3>
                    }
                </>
            </LayoutListRecords>
        </>
    );
};

export default Employees;