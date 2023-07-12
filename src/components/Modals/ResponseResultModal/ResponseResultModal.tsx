import React from 'react';
import {useQuerySuccess} from "../../../hooks/useQuerySuccess";
import {useQueryError} from "../../../hooks/useQueryError";
import QueryModal from "../../QueryModal/QueryModal";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {REACT_APP_API_URL, REACT_APP_CLIENT_URL} from "../../../utils/constants";

interface IProps {
    isSuccess: boolean,
    isError: boolean
    error: FetchBaseQueryError | SerializedError | undefined,
    successMessage: string
}

const ResponseResultModal: React.FC<IProps> = ({isSuccess, isError, error, successMessage}) => {
    const [visibleCreateSuccess, setVisibleCreateSuccess] = React.useState(false);
    const [visibleCreateError, setVisibleCreateError] = React.useState(false);

    const navigate = useNavigate();

    useQuerySuccess(isSuccess, setVisibleCreateSuccess);
    const {message: errorMessage} = useQueryError(setVisibleCreateError, isError, error);

    return (
        <>
            <QueryModal show={visibleCreateSuccess} onHide={setVisibleCreateSuccess} message={successMessage} type='success' />
            <QueryModal show={visibleCreateError} onHide={setVisibleCreateError} message={errorMessage} type='error' />
        </>
    );
};

export default ResponseResultModal;