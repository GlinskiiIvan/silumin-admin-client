import React from 'react';
import Input from "../../../UI/Input/Input";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

import  styles from './UsersActions.module.scss';
import MultipleSelect from "../../../UI/MultipleSelect/MultipleSelect";

const UsersActions: React.FC = () => {
    const params = useParams();

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

    React.useEffect(() => {
        if(params.id) {
            setName('Test name edit');
        }
    }, []);

    const roles = [
        'Super',
        'Admin',
        'User',
        'Abobus',
        'Редактирование',
        'Сохранить',
        'ssssss',
    ];

    return (
        <LayoutActionRecord
            title={`${params.id ? 'Редактирование' : 'Создание'} пользователя`}
            actionText={`${params.id ? 'Сохранить' : 'Создать'} пользователя`}
            action={() => console.log('ssssss')} >
            <>
                <div>
                    <h3>Имя</h3>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Введите имя...' />
                </div>
                <div>
                    <h3>Пароль</h3>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Введите пароль...' />
                </div>
                <div>
                    <h3>Роли</h3>

                    <MultipleSelect items={roles} selectedItems={selectedRoles} setSelectedItems={setSelectedRoles} />

                </div>
            </>
        </LayoutActionRecord>
    );
};

export default UsersActions;