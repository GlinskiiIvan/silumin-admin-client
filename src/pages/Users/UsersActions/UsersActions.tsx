import React from 'react';
import Input from "../../../UI/Input/Input";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import {useParams} from "react-router-dom";

const UsersActions: React.FC = () => {
    const params = useParams();

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        if(params.id) {
            setName('Test name edit');
        }
    }, []);

    return (
        <LayoutActionRecord
            title={`${params.id ? 'Редактирование' : 'Создание'} сотрудника`}
            actionText={`${params.id ? 'Сохранить' : 'Создать'} сотрудника`}
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
            </>
        </LayoutActionRecord>
    );
};

export default UsersActions;