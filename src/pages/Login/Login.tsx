import React from 'react';

import styles from './Login.module.scss';
import Input from "../../UI/Input/Input";
import {Button} from "react-bootstrap";

const Login: React.FC = () => {

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginHandler = async () => {
        if(name && password) {
            setName('');
            setPassword('');
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Авторизация</h1>
                <form action="">
                    <Input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Введите имя...' />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Введите пароль...' />
                    <Button onClick={loginHandler} variant='success' >Войти</Button>
                </form>

            </div>
        </div>
    );
};

export default Login;