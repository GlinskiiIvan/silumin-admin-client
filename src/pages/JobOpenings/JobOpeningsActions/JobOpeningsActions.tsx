import React from 'react';
import { Button } from 'react-bootstrap';

import styles from './JobOpeningsActions.module.scss';

import Input from '../../../UI/Input/Input';
import { useParams } from 'react-router-dom';
import LayoutActionRecord from '../../../Layouts/LayoutActionRecord/LayoutActionRecord';
import Textarea from '../../../UI/Textarea/Textarea';

interface ICondition {
    id: number;
    value: string;
}

const JobOpeningsActions: React.FC = () => {
    const params = useParams();

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duties, setDuties] = React.useState<ICondition[]>([]);
    const [requirements, setRequirements] = React.useState<ICondition[]>([]);

    
    const addRequirement = () => {
        setRequirements([...requirements, {id: Math.random(), value: ''}]);
    }
    const changeRequirement = (id: number, value: string) => {
        setRequirements(requirements.map(item => item.id === id ? {...item, value} : item));
    }
    const removeRequirement = (id: number) => {
        setRequirements(requirements.filter((item) => item.id !== id));
    };

    const addDuty = () => {
        setDuties([...duties, {id: Math.random(), value: ''}]);
    }
    const changeDuty = (id: number, value: string) => {
        setDuties(duties.map(item => item.id === id ? {...item, value} : item));
    }
    const removeDuty = (id: number) => {
        setDuties(duties.filter((item) => item.id !== id));
    };

    React.useEffect(() => {
        if(params.id) {
            setName('Test name edit');
            setDescription('Test description edit')
        }
    }, []);

    return (
        <LayoutActionRecord
            title={`${params.id ? 'Редактирование' : 'Создание'} вакансии`}
            actionText={`${params.id ? 'Сохранить' : 'Создать'} вакансию`}
            action={() => console.log('ssssss')} >
            <>
                <div>
                    <h3>Название</h3>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Введите название...' />
                </div>
                <div>
                    <h3>Описание</h3>
                    {/* <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' placeholder='Введите описание...' /> */}
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' placeholder='Введите описание...' />
                </div>
                <div className={`${styles.option}`}>
                    <h3>Требования</h3>
                    <div className={styles.option__list}>
                        {!requirements.length && <p>Требования не прописаны! Для того что бы добавить требования нажмите кнокну ниже "Добавить требование"</p>}
                        {requirements.map((item) => (
                            <Input 
                                key={item.id} 
                                value={item.value} 
                                onChange={e => changeRequirement(item.id, e.target.value)} 
                                type="text" 
                                placeholder='Введите требование...' 
                                onDelete={() => removeRequirement(item.id)} />
                        ))}
                    </div>
                    <Button onClick={addRequirement} style={{width: 'fit-content'}}>Добавить требование</Button>
                </div>
                <div className={`${styles.option}`}>
                    <h3>Обязанности</h3>
                    <div className={styles.option__list}>
                        {!duties.length && <p>Обязанности не прописаны! Для того что бы добавить требования нажмите кнокну ниже "Добавить обязанность"</p>}
                        {duties.map((item) => (
                            <Input 
                                key={item.id} 
                                value={item.value} 
                                onChange={e => changeDuty(item.id, e.target.value)} 
                                type="text" 
                                placeholder='Введите обязанность...' 
                                onDelete={() => removeDuty(item.id)} />
                        ))}
                    </div>
                    <Button onClick={addDuty}>Добавить обязанность</Button>
                </div>
            </>
        </LayoutActionRecord>
    );
};

export default JobOpeningsActions;