import React from "react";

export interface IValidations {
    isEmpty?: boolean,
    minLength?: number,
    maxLength?: number,
    isPassword?: boolean
}

enum ErrorMessages {
    isEmpty= '* Поле обязательно к заполнению!',
    minLengthError= '* Длина должна быть не менее 4 символов!',
    maxLengthError= '* Длина должна быть не более 16 символов!',
    passwordError= '* Пароль должен содержать цифры, специальные символы, строчные и заглавные буквы!',
}

export const useValidation = (value: string, validations: IValidations) => {
    const [isValid, setIsValid] = React.useState(false);

    const [isEmpty, setIsEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] = React.useState(false);
    const [maxLengthError, setMaxLengthError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        /*for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    value ? setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.isEmpty)) : !errors.includes(ErrorMessages.isEmpty) && setErrors((prevState) => [...prevState, ErrorMessages.isEmpty]);
                    break;
                case 'minLength':
                    if(validations.minLength) {
                        value.length < validations.minLength ? setMinLengthError(true) : setMinLengthError(false);
                        value.length < validations.minLength ? !errors.includes(ErrorMessages.minLengthError) && setErrors((prevState) => [...prevState, ErrorMessages.minLengthError]) : setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.minLengthError));
                    }
                    break;
                case 'maxLength':
                    if(validations.maxLength) {
                        value.length > validations.maxLength ? setMaxLengthError(true) : setMaxLengthError(false);
                        value.length > validations.maxLength ? !errors.includes(ErrorMessages.maxLengthError) && setErrors((prevState) => [...prevState, ErrorMessages.maxLengthError]) : setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.maxLengthError));
                    }
                    break;
                case 'isPassword':
                    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,16}$/
                    re.test(String(value)) ? setPasswordError(false) : setPasswordError(true);
                    re.test(String(value)) ? setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.passwordError)) : !errors.includes(ErrorMessages.passwordError) && setErrors((prevState) => [...prevState, ErrorMessages.passwordError]);
                    break;

            }
        }*/
        if(validations.isEmpty) {
            value ? setIsEmpty(false) : setIsEmpty(true);
            value ? setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.isEmpty)) : !errors.includes(ErrorMessages.isEmpty) && setErrors((prevState) => [...prevState, ErrorMessages.isEmpty]);
        }
        if(validations.minLength) {
            value.length < validations.minLength ? setMinLengthError(true) : setMinLengthError(false);
            value.length < validations.minLength ? !errors.includes(ErrorMessages.minLengthError) && setErrors((prevState) => [...prevState, ErrorMessages.minLengthError]) : setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.minLengthError));
        }
        if(validations.maxLength) {
            value.length > validations.maxLength ? setMaxLengthError(true) : setMaxLengthError(false);
            value.length > validations.maxLength ? !errors.includes(ErrorMessages.maxLengthError) && setErrors((prevState) => [...prevState, ErrorMessages.maxLengthError]) : setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.maxLengthError));
        }
        if(validations.isPassword) {
            const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
            re.test(String(value)) ? setPasswordError(false) : setPasswordError(true);
            re.test(String(value)) ? setErrors((prevState) => prevState.filter((str) => str !== ErrorMessages.passwordError)) : !errors.includes(ErrorMessages.passwordError) && setErrors((prevState) => [...prevState, ErrorMessages.passwordError]);
        }
    }, [value])

    React.useEffect(() => {
        if(isEmpty || minLengthError || maxLengthError || passwordError) setIsValid(false);
        else setIsValid(true);


    }, [isEmpty,
        minLengthError,
        maxLengthError,
        passwordError]);

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        passwordError,
        errors,
        isValid
    }
}