import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import HomeLayout from 'components/layouts/AuthLayout';
import Button from 'components/UI/Button';
import './Signup.scss';
import Input from 'components/UI/Input';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const isDisabled = !password || !email;

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeConfirmedPassword = (event) => {
        setConfirmedPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event?.preventDefault();

        if (isDisabled) return;

        navigate('/');
    };

    return (
        <HomeLayout>
            <div className='signup-container'>
                <header>
                    <Button
                        label='Назад'
                        type='transparent'
                        path='/home'
                        leftIcon={<BsArrowLeft width={10} height={10} />}
                    />
                    <Button label='Вхід' type='default' path='/login' />
                </header>
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='title'>Ласкаво просимо!</h1>
                    <div className='inputs-container'>
                        <Input
                            type='text'
                            placeholder="Ім'я користувача"
                            value={name}
                            onChange={handleChangeName}
                        />
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
                        <Input
                            type='password'
                            placeholder='Підтвердження паролю'
                            value={confirmedPassword}
                            onChange={handleChangeConfirmedPassword}
                        />
                    </div>
                    <Button
                        className='signup-btn'
                        label='Зареєструватися'
                        isDisabled={isDisabled}
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </HomeLayout>
    );
};

export default Signup;
