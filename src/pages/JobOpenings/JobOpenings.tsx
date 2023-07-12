import React from 'react';

import LayoutListRecords from '../../Layouts/LayoutListRecords/LayoutListRecords';
import Record from '../../components/Record/Record';
import { ROUTES } from '../../utils/constants';
import {jobOpeningsAPI} from "../../store/services/job-openings";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";

const JobOpenings: React.FC = () => {
    const {data = [], error, isLoading} = jobOpeningsAPI.useGetAllJobOpeningsQuery();
    const [removeJobOpening, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = jobOpeningsAPI.useRemoveJobOpeningMutation();

    const onDeleteHandler = async (id: number) => {
        await removeJobOpening({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Вакансия успешно удалена!' />

            <LayoutListRecords title='Вакансии' buttonLink={ROUTES.JOB_OPENINGS_CREATE_ROUTE} buttonText='Добавить вакансию'>
                <>
                    {
                        isLoading
                        ? <h3>Получение вакансий...</h3>
                        : data.length > 0
                        ? data.map((item) => (
                                <Record key={item.id} title={item.name} editTo={ROUTES.JOB_OPENINGS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                            ))
                        : <h3>Вакансии не найдены...</h3>
                    }
                </>
            </LayoutListRecords>
        </>
    );
};

export default JobOpenings;