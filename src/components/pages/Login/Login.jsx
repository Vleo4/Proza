import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import api from 'api';
import { saveToLocalStorage, saveToSessionStorage } from 'utils/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/localStorageKeys';

import HomeLayout from 'components/layouts/AuthLayout';
import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import './Login.scss';
import { useAuthContext } from 'contexts/AuthContext';

const Login = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthentificated && !isAuthLoading) {
            navigate('/');
        }
    }, [isAuthentificated, isAuthLoading]);

    const onSubmit = async (data) => {
        const { username, password, isRemember } = data;
        setLoading(true);

        try {
            const { access, refresh } = await api.auth.login(username, password);
            if (isRemember) {
                saveToLocalStorage(ACCESS_TOKEN, access);
                saveToLocalStorage(REFRESH_TOKEN, refresh);
            } else {
                saveToSessionStorage(ACCESS_TOKEN, access);
                saveToSessionStorage(REFRESH_TOKEN, refresh);
            }
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            setError('password', {
                message: 'Неправильний логін або пароль!'
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeLayout>
            <div className='login-container'>
                <div className='form-container'>
                    <form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h1 className='form__title'>Світ ловив мене, та не спіймав</h1>
                        <div className='inputs-container'>
                            <Controller
                                control={control}
                                name='username'
                                rules={{ required: 'Це поле обовʼязкове для введення' }}
                                render={({ field }) => (
                                    <Input
                                        type='text'
                                        placeholder='Логін'
                                        error={errors.username}
                                        inputProps={field}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='password'
                                rules={{ required: 'Це поле обовʼязкове для введення' }}
                                render={({ field }) => (
                                    <Input
                                        type='password'
                                        placeholder='Пароль'
                                        error={errors.password}
                                        inputProps={field}
                                    />
                                )}
                            />
                        </div>
                        <div className='checkbox-and-link'>
                            <Controller
                                control={control}
                                name='isRemember'
                                render={({ field }) => (
                                    <input {...field} type='checkbox' className='checkbox' />
                                )}
                            />
                            <span>Запам&apos;ятати мене</span>
                            <Link to='/forgot-password' className='forgot-password'>
                                Забули пароль?
                            </Link>
                        </div>
                        <Button
                            buttonProps={{ type: 'submit' }}
                            className='login-btn'
                            label='Увійти'
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Login;
