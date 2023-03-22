import React, { useState } from 'react';
import HomeLayout from 'components/layouts/AuthLayout';
import Button from 'components/UI/Button/Button';
import './Signup.scss';
import Input from 'components/UI/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import api from 'api';
import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveToSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/localStorageKeys';
import AlertSignup from '../../UI/AlertSignup/AlertSignup';
import useResizer from '../../../utils/utils';

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthentificated } = useAuthContext();
    const [setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    React.useEffect(() => {
        if (isAuthentificated) {
            navigate('/');
        }
    }, []);
    const [alert, toggleAlert] = useState(false);
    const onSubmit = async (data) => {
        if (data.password !== data.confirmedPassword) {
            setError('confirmedPassword', 'Паролі не збігаються');
            return;
        }

        try {
            const response = await api.auth.register(data.username, data.email, data.password);

            if (response.user) {
                const { access, refresh } = await api.auth.login(data.username, data.password);
                saveToSessionStorage(ACCESS_TOKEN, access);
                saveToSessionStorage(REFRESH_TOKEN, refresh);
                toggleAlert(true);
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setError('username', {
                message: 'Це імʼя вже зареєстроване'
            });
            return;
        }
    };

    const toggleAlertFunc = () => {
        toggleAlert(!alert);
    };
    const isMobile = useResizer();
    return (
        <>
            {isMobile && alert ? (
                <>
                    <AlertSignup toggleAlert={toggleAlertFunc} alert={alert} />
                </>
            ) : (
                <>
                    <AlertSignup toggleAlert={toggleAlertFunc} alert={alert} />
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
                                            pattern:
                                                /^(?=[a-zA-Z0-9._]{4,199}$)(?!.*[_.]{2})[^_.].*[^_.]$/
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
                </>
            )}
        </>
    );
};

export default Signup;
