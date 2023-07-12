import React from "react";
import {IValidations, useValidation} from "./useValidation";

export const useInput = (initialValue: string, validations: IValidations) => {
    const [value, setValue] = React.useState(initialValue);
    const [isDirty, setIsDirty] = React.useState(false);

    const valid = useValidation(value, validations);

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const onBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsDirty(true);
    }

    const onReset = () => {
        setValue(initialValue);
        setIsDirty(false);
    }

    const onSetValue = (str: string) => {
        setValue(str);
    }

    return {
        value,
        onChange,
        onBlur,
        onReset,
        onSetValue,
        isDirty,
        ...valid
    }
}