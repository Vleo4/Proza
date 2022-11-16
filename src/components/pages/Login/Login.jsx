import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import HomeLayout from 'components/layouts/HomeLayout';
import Button from 'components/UI/Button';
import './Login.scss';
import Input from 'components/UI/Input';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setRemember] = useState(false);

    const isDisabled = !password || !email;

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeRemember = (event) => {
        setRemember(event.target.checked);
    };

    const handleSubmit = (event) => {
        event?.preventDefault();

        if (isDisabled) return;

        navigate('/');
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
                        />
                        <Input
                            type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </div>
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
                        className='signup-btn'
                        label='Увійти'
                        isDisabled={isDisabled}
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </HomeLayout>
    );
};

export default Login;
