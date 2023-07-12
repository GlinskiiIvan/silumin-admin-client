import React from 'react';

import styles from './Login.module.scss';
import Input from "../../UI/Input/Input";
import {Button} from "react-bootstrap";
import {useInput} from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {loginThunk, selectUser} from "../../store/slices/user";
import QueryModal from "../../components/QueryModal/QueryModal";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(selectUser);

    const name = useInput('', {isEmpty: true});
    const password = useInput('', {isEmpty: true, minLength: 4, maxLength: 16, isPassword: true});
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if(user.error) {
            setVisibleModal(true);
            setError(user.error);
        }
    }, [user])

    const loginHandler = async () => {
        await dispatch(loginThunk({name: name.value, password: password.value}));
    }

    return (
        <>
            <QueryModal show={visibleModal} onHide={setVisibleModal} message={error} type='error' />

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1>Авторизация</h1>
                    <form action="">
                        <Input value={name.value} onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} isDirty={name.isDirty} errors={name.errors} type="text" placeholder='Введите имя...' />
                        <Input value={password.value} onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} isDirty={password.isDirty} errors={password.errors} type="password" placeholder='Введите пароль...' />
                        <Button disabled={!name.isValid || !password.isValid} onClick={loginHandler} variant='success' >Войти</Button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;