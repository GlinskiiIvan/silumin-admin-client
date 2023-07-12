import React from 'react';

import styles from './News.module.scss';
import {licenseAPI} from "../../store/services/licenses";
import {newsAPI} from "../../store/services/news";
import ResponseResultModal from "../../components/Modals/ResponseResultModal/ResponseResultModal";
import {ROUTES} from "../../utils/constants";
import Record from "../../components/Record/Record";
import LayoutListRecords from "../../Layouts/LayoutListRecords/LayoutListRecords";

const News: React.FC = () => {
    const {data = [], error, isLoading} = newsAPI.useGetAllNewsQuery();
    const [removeNews, {isSuccess: removeIsSuccess, isError: removeIsError, error: removeError}] = newsAPI.useRemoveNewsMutation();

    const onDeleteHandler = async (id: number) => {
        await removeNews({id});
    }
    
    return (
        <>
            <ResponseResultModal isSuccess={removeIsSuccess} isError={removeIsError} error={removeError} successMessage='Новость успешно удалена!' />

            <LayoutListRecords title='Новости' buttonLink={ROUTES.NEWS_CREATE_ROUTE} buttonText='Добавить новость'>
                <>
                    {data.map((item) => (
                        <Record key={item.id} title={item.title} text={item.sub_title} editTo={ROUTES.NEWS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                    ))}
                </>
            </LayoutListRecords>
        </>
    );
};

export default News;