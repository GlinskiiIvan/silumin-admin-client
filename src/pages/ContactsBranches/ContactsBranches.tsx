import React from 'react';

import {contactsBranchesAPI} from "../../store/services/contactsBranches";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";

const ContactsBranches: React.FC = () => {
    const {data = [], error, isLoading} = contactsBranchesAPI.useGetAllContactsBranchesQuery();
    const [remove, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = contactsBranchesAPI.useRemoveContactsBranchesMutation();

    const onDeleteHandler = async (id: number) => {
        await remove({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Филиал успешно удален!' />

            <LayoutListRecords title='Филиалы' buttonLink={ROUTES.CONTACTS_BRANCHES_CREATE_ROUTE} buttonText='Добавить филиал'>
                <>
                    {
                        isLoading
                            ? <h3>Получение филиалов...</h3>
                            : data.length > 0
                                ? data.map((item) => (
                                    <Record key={item.id} title={`${item.name} - ${item.city}`} text={item.address} editTo={ROUTES.CONTACTS_BRANCHES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                                ))
                                : <h3>Филиалы не найдены...</h3>
                    }
                </>
            </LayoutListRecords>
        </>
    );
};

export default ContactsBranches;