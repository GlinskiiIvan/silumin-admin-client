import React from 'react';
import {requirementsAPI} from "../../store/services/requirements";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";

const Requirements: React.FC = () => {
    const {data = [], error, isLoading} = requirementsAPI.useGetAllRequirementsQuery();
    const [removeRequirement, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = requirementsAPI.useRemoveRequirementMutation();

    const onDeleteHandler = async (id: number) => {
        await removeRequirement({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Требование успешно удалено!' />

            <LayoutListRecords title='Требования' buttonLink={ROUTES.REQUIREMENTS_CREATE_ROUTE} buttonText='Добавить требование'>
                <>
                    {data.map((item) => (
                        <Record key={item.id} title={item.value} editTo={ROUTES.REQUIREMENTS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                    ))}
                </>
            </LayoutListRecords>
        </>
    );
};

export default Requirements;