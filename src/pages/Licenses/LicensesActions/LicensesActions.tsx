import React from "react";
import { Button } from "react-bootstrap";

import styles from './LicensesActions.module.scss';
import Input from "../../../UI/Input/Input";
import {ReactComponent  as ClearIcon} from '../../../assets/icons/clear.svg';
import { useParams } from "react-router-dom";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useInput} from "../../../hooks/useInput";
import {ILicenseItem, licenseAPI} from "../../../store/services/licenses";
import {usersAPI} from "../../../store/services/users";
import {rolesAPI} from "../../../store/services/roles";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";
import {REACT_APP_API_URL} from "../../../utils/constants";

interface INewLicenses {id: number; file: File}

const LicensesActions: React.FC = () => {
    const params = useParams();

    const [licensesTrigger, licensesResult] = licenseAPI.useLazyGetOneLicenseQuery();

    const [createLicenses, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = licenseAPI.useCreateLicenseMutation();
    const [updateLicenses, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = licenseAPI.useUpdateLicenseMutation();

    const name = useInput('', {isEmpty: true});

    const [licenses, setLicenses] = React.useState<ILicenseItem[]>([]);
    const [newLicenses, setNewLicenses] = React.useState<INewLicenses[]>([]);
    const [removedLicenses, setRemovedLicenses] = React.useState<number[]>([]);

    const isValid = params.id ? !name.isValid || !(licenses.length > 0 || newLicenses.length > 0) : !name.isValid || !(newLicenses.length > 0)

    React.useEffect(() => {
        if(params.id) {
            licensesTrigger(+params.id);
            if(licensesResult.data) {
                name.onSetValue(licensesResult.data.name)
                setLicenses(licensesResult.data.licenses)
            }
        }

        if (createIsSuccess) {
            name.onReset();
            setLicenses([]);
            setNewLicenses([]);
            setRemovedLicenses([]);
        }
        if(updateIsSuccess) {
            setNewLicenses([]);
            setRemovedLicenses([]);
        }
    }, [licensesResult.data, createIsSuccess, updateIsSuccess]);

    const removeLicenses = (id: number) => {
        setLicenses(licenses.filter((item) => id !== item.id));
        setRemovedLicenses([...removedLicenses, id]);
    }

    const addNewLicenses = (files: FileList | null) => {
        if(files && files.length) {
            const filesArr: INewLicenses[] = [];
            for (let index = 0; index < files.length; index++) {
                const item: INewLicenses = {id: Math.random(), file: files[index]};
                filesArr.push(item);
            }
            setNewLicenses([...newLicenses, ...filesArr]);
        }
    }
    const removeNewLicenses = (id: number) => {
        setNewLicenses(newLicenses.filter((item) => id !== item.id));
    }

    const actionUserHandler = async () => {
        if(params.id) {
            const formData = new FormData();
            formData.append('name', name.value);
            removedLicenses.length > 0 && formData.append('licenses_remove', JSON.stringify(removedLicenses));
            newLicenses.map((file) => {
                formData.append('images', file.file);
            })
            await updateLicenses({id: +params.id, formData});
        } else {
            const formData = new FormData();
            formData.append('name', name.value);
            newLicenses.map((file) => {
                formData.append('images', file.file);
            })
            await createLicenses(formData);
        }
    }

    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Категория лицензий успешно добавлена!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Категория лицензий успешно обновлена!' />

            <LayoutActionRecord
                title={`${params.id ? 'Редактирование' : 'Создание'} категорию лицензий`}
                actionText={`${params.id ? 'Сохранить' : 'Создать'} категорию лицензий`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Название</h3>
                        <Input value={name.value} onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} isDirty={name.isDirty} errors={name.errors} type="text" placeholder='Введите название...' />
                    </div>
                    {params.id && (
                        <div className={styles.licenses}>
                            <h3>Существующие элементы</h3>
                            {
                                licenses.length > 0
                                ? (
                                        <div className={styles.licenses__list}>
                                            {licenses.map((item) => (
                                                <div key={item.id} className={styles['licenses__list--item']}>
                                                    <img src={REACT_APP_API_URL + item.image} alt="" />
                                                    <ClearIcon onClick={() => removeLicenses(item.id)} />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                : <p>Вы удалили все существующие элементы! Добавьте новые что бы сохранить изменения.</p>
                            }
                        </div>
                    )}
                    <div className={styles.licenses}>
                        <h3>Новые элементы</h3>
                        {!newLicenses.length && (
                            <p>Новых элементов нет. Для того что бы добавить нажмите кнопку "Добавить"</p>
                        )}
                        <div className={styles.licenses__list}>
                            {newLicenses.map((item) => (
                                <div key={item.id} className={styles['licenses__list--item']}>
                                    <img src={URL.createObjectURL(item.file)} alt="" />
                                    <ClearIcon onClick={() => removeNewLicenses(item.id)} />
                                </div>
                            ))}
                        </div>
                        <Button style={{width: 'fit-content'}}>
                            <label htmlFor="files">
                                Добавить
                            </label>
                        </Button>
                        <input
                            id="files"
                            type="file"
                            multiple onChange={(e) => addNewLicenses(e.target.files)}
                            placeholder="Добавить"
                            style={{display: 'none'}} />
                    </div>
                </>
            </LayoutActionRecord>
        </>
    )
}

export default LicensesActions;