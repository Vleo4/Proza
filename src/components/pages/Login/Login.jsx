import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import HomeLayout from 'components/layouts/HomeLayout';
import Button from 'components/UI/Button';
import './Login.scss';
import Input from 'components/UI/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from 'api';
import { saveToLocalStorage, saveToSessionStorage } from 'utils/storage';
import { TOKEN } from 'constants/localStorageKeys';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const isDisabled = !password || !email;

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setError('');
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setError('');
    };

    const handleChangeRemember = (event) => {
        setRemember(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event?.preventDefault();

        if (isDisabled) return;
        setLoading(true);

        try {
            const data = await api.auth.login(email, password);
            if (isRemember) {
                saveToLocalStorage(TOKEN, data.token);
            } else {
                saveToSessionStorage(TOKEN, data.token);
            }
            navigate('/');
        } catch (err) {
            setError('Incorrect email or password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeLayout>
            <div className='login-container'>
                <header>
                    <Button
                        label='Назад'
                        type='transparent'
                        path='/home'
                        leftIcon={<BsArrowLeft width={10} height={10} />}
                    />
                    <Button label='Реєстрація' type='default' path='/signup' />
                </header>
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='title'>Світ ловив мене, та не спіймав</h1>
                    <div className='inputs-container'>
                        <Input
                            type='email'
                            placeholder='Електронна пошта'
                            value={email}
                            onChange={handleChangeEmail}
                            error={error}
                        />
                        <Input
                            type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={handleChangePassword}
                            error={error}
                        />
                    </div>
                    {error && <span className='error-text'>{error}</span>}
                    <div className='checkbox-and-link'>
                        <input
                            type='checkbox'
                            className='checkbox'
                            onChange={handleChangeRemember}
                            checked={isRemember}
                        />
                        <span>Запам&apos;ятати мене</span>
                        <Link to='/forgot-password' className='forgot-password'>
                            Забули пароль?
                        </Link>
                    </div>
                    <Button
                        className='login-btn'
                        label='Увійти'
                        isDisabled={isDisabled}
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    />
                </form>
            </div>
        </HomeLayout>
    );
};

export default Login;
