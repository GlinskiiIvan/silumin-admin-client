import React from 'react';

import { ROUTES } from '../../utils/constants';
import Record from '../../components/Record/Record';
import LayoutListRecords from '../../Layouts/LayoutListRecords/LayoutListRecords';
import {usersAPI} from "../../store/services/users";
import {licenseAPI} from "../../store/services/licenses";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";

const Licenses: React.FC = () => {
    const {data = [], error, isLoading} = licenseAPI.useGetAllLicensesQuery();
    const [removeLicense, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = licenseAPI.useRemoveLicenseMutation();

    const onDeleteHandler = async (id: number) => {
        await removeLicense({id});
    }

    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Категория лицензий успешно удалена!' />

            <LayoutListRecords title='Лицензии и сертификаты' buttonLink={ROUTES.LICENSES_CREATE_ROUTE} buttonText='Добавить категорию лицензий'>
                <>
                    {data.map((item) => (
                        <Record key={item.id} title={item.name} editTo={ROUTES.LICENSES_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                    ))}
                </>
            </LayoutListRecords>
        </>
    );
};

export default Licenses;