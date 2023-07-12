import React from "react";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export const useQueryError = (
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined) => {

    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        if(isError) {
            if (error && 'data' in error) {
                const errorStr = JSON.stringify(error.data);
                const errorParsed = JSON.parse(errorStr);

                if(errorParsed.message) {
                    setMessage(errorParsed.message);
                    setVisibleModal(true);
                }
            else {
                    const errors = errorParsed.map((str: string) => {
                        const items = str.split('|');
                        return {
                            name: items[0],
                            err: items[1]
                        }
                    })
                    console.log(errors);
                }
            }
        }
    }, [isError, message])

    return {message};
}