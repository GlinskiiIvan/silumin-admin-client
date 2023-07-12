import React from 'react';

interface IProps {
    readonly isDirty?: boolean;
    readonly errors?: string[];
}

const InputErrorMessage: React.FC<IProps> = ({isDirty, errors = []}) => {
    return (
        <div>
            {
                isDirty && errors.map((messageError, index) => (
                    <div key={index} style={{color: 'red'}}>{messageError}</div>
                ))
            }
        </div>
    );
};

export default InputErrorMessage;