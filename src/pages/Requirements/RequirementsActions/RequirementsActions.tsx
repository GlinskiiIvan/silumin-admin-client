import React from 'react';
import {useParams} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import {requirementsAPI} from "../../../store/services/requirements";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import Input from "../../../UI/Input/Input";

const RequirementsActions: React.FC = () => {
    const {id} = useParams();

    const [requirementTrigger, requirementResult] = requirementsAPI.useLazyGetOneRequirementQuery();
    const [createRequirement, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = requirementsAPI.useCreateRequirementMutation();
    const [updateRequirement, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = requirementsAPI.useUpdateRequirementMutation();
    
    const value = useInput('', {isEmpty: true});
    
    const isValid = !value.isValid;

    React.useEffect(() => {
        if(id) {
            requirementTrigger(+id);
            if(requirementResult.data) {
                value.onSetValue(requirementResult.data.value);
            }
        }

        if (createIsSuccess) {
            value.onReset();
        }
        if(updateIsSuccess) {
        }
    }, [requirementResult.data, createIsSuccess, updateIsSuccess]);

    const actionUserHandler = async () => {
        if(id) {
            await updateRequirement({id: +id, value: value.value});
        } else {
            await createRequirement({value: value.value});
        }
    }
    
    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Требование успешно добавлено!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Требование успешно обновлено!' />

            <LayoutActionRecord
                title={`${id ? 'Редактирование' : 'Создание'} требования`}
                actionText={`${id ? 'Сохранить' : 'Создать'} требование`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Значение</h3>
                        <Input value={value.value} onChange={(e) => value.onChange(e)} onBlur={(e) => value.onBlur(e)} isDirty={value.isDirty} errors={value.errors} type="text" placeholder='Введите заголовок...' />
                    </div>
                </>
            </LayoutActionRecord>
        </>
    )
};

export default RequirementsActions;