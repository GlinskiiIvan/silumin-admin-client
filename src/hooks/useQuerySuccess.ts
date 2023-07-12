import React from "react";

export const useQuerySuccess = (
    isSuccess: boolean,
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    React.useEffect(() => {
        if(isSuccess) {
            setVisibleModal(true);
        }
    }, [isSuccess])
}