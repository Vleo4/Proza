import React, { useEffect } from 'react';
import HomeLayout from 'components/layouts/AuthLayout';
import Button from 'components/UI/Button';
import './Signup.scss';
import Input from 'components/UI/Input';
import { Controller, useForm } from 'react-hook-form';
import api from 'api';
import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthentificated, isLoading } = useAuthContext();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (isAuthentificated && !isLoading) {
            navigate('/');
        }
    }, [isAuthentificated, isLoading]);

    const onSubmit = async (data) => {
        if (data.password !== data.confirmedPassword) {
            setError('confirmedPassword', 'Паролі не збігаються');
            return;
        }

        try {
            const response = await api.auth.register(data.username, data.email, data.password);

            if (response.user) {
                navigate('/login');
            }
        } catch (e) {
            console.error(e);
            setError('username', {
                message: 'Це імʼя вже зареєстроване'
            });
            return;
        }
    };

    return (
        <HomeLayout>
            <div className='signup-container'>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='title'>Ласкаво просимо!</h1>
                    <div className='inputs-container'>
                        <Controller
                            name='username'
                            control={control}
                            rules={{
                                required: 'Це поле обовʼязкове для вводу!',
                                pattern: /^(?=[a-zA-Z0-9._]{4,199}$)(?!.*[_.]{2})[^_.].*[^_.]$/
                            }}
                            render={({ field }) => (
                                <Input
                                    inputProps={field}
                                    type='text'
                                    error={errors.username}
                                    placeholder="Ім'я користувача"
                                />
                            )}
                        />
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: 'Це поле обовʼязкове для вводу!' }}
                            render={({ field }) => (
                                <Input
                                    inputProps={field}
                                    type='email'
                                    error={errors.email}
                                    placeholder='Електронна пошта'
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: 'Це поле обовʼязкове для вводу!' }}
                            render={({ field }) => (
                                <Input
                                    inputProps={field}
                                    type='password'
                                    placeholder='Пароль'
                                    error={errors.password}
                                />
                            )}
                        />
                        <Controller
                            name='confirmedPassword'
                            control={control}
                            rules={{ required: 'Це поле обовʼязкове для вводу!' }}
                            render={({ field }) => (
                                <Input
                                    inputProps={field}
                                    error={errors.confirmedPassword}
                                    type='password'
                                    placeholder='Підтвердження паролю'
                                />
                            )}
                        />
                    </div>
                    <Button
                        buttonProps={{ type: 'submit' }}
                        className='signup-btn'
                        label='Зареєструватися'
                    />
                </form>
            </div>
        </HomeLayout>
    );
};

export default Signup;
