import React from "react";
import { Button } from "react-bootstrap";

import styles from './LicensesActions.module.scss';
import Input from "../../../UI/Input/Input";
import {ReactComponent  as ClearIcon} from '../../../assets/icons/clear.svg';
import { useParams } from "react-router-dom";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";

interface ILicense {id: number; image: string};
interface INewLicenses {id: number; file: File};

const LicensesActions: React.FC = () => {
    const params = useParams();
    const [name, setName] = React.useState('');

    const [licenses, setLicenses] = React.useState<ILicense[]>([
        {id: 1, image: 'http://advertme.ru/wp-content/uploads/2017/09/3-2.jpg'},
        {id: 2, image: 'https://p.calameoassets.com/130919080651-6f49ef882ce98172abc26204d0afcfdd/p1.jpg'},
        {id: 3, image: 'http://pargolovskiy-tlk.ru/upload/images/certificates/en/cert-201805291559-km.jpg'},
        {id: 4, image: 'https://abl.kz/wp-content/uploads/2020/10/licenziya-11gsl-kr-01946-700x987.jpeg'},
    ]);
    const [newLicenses, setNewLicenses] = React.useState<INewLicenses[]>([]);
    const removedLicenses: number[] = [];

    const removeLicenses = (id: number) => {
        setLicenses(licenses.filter((item) => id !== item.id));
        removedLicenses.push(id);
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

    React.useEffect(() => {
        if(params.id) {
            setName('Test name edit');
        }
    }, []);

    return (
        <LayoutActionRecord 
            title={`${params.id ? 'Редактирование' : 'Создание'} категоии лицензии`}
            actionText={`${params.id ? 'Редактирование' : 'Создание'} категоии`}
            action={() => console.log('yyyaaa')}>
            <>
                <div>
                    <h3>Название</h3>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Введите название...' />
                </div>
                {params.id && (
                    <div className={styles.licenses}>
                        <h3>Существующие элементы</h3>
                        <div className={styles.licenses__list}>
                        {licenses.map((item) => (
                            <div key={item.id} className={styles['licenses__list--item']}>
                                <img src={item.image} alt="" />
                                <ClearIcon onClick={() => removeLicenses(item.id)} />
                            </div>
                        ))}
                    </div>
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
    )
}

export default LicensesActions;