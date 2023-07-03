import React from 'react';

import  styles from './RolesActions.module.scss';
import Input from "../../../UI/Input/Input";
import MultipleSelect from "../../../UI/MultipleSelect/MultipleSelect";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useParams} from "react-router-dom";
import Textarea from "../../../UI/Textarea/Textarea";

const RolesActions: React.FC = () => {
    const params = useParams();

    const [value, setValue] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

    const users = [
        'Ivan',
        'User 1',
        'Tanya',
        'Dima',
        'Masha',
        'Nastya',
        'User 2',
    ];

    return (
        <LayoutActionRecord
            title={`${params.id ? 'Редактирование' : 'Создание'} роли`}
            actionText={`${params.id ? 'Сохранить' : 'Создать'} роли`}
            action={() => console.log('ssssss')} >
            <>
                <div>
                    <h3>Значение</h3>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Введите значение...' />
                </div>
                <div>
                    <h3>Описание</h3>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Введите описание...' />
                </div>
                <div>
                    <h3>Пользователи</h3>
                    <MultipleSelect items={users} selectedItems={selectedUsers} setSelectedItems={setSelectedUsers} />
                </div>
            </>
        </LayoutActionRecord>
    );
};

export default RolesActions;