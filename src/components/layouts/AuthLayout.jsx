import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import logo from '../../assets/images/logo.png';
import mobileLogo from '../../assets/images/auth/mobile-logo.svg';
import Button from 'components/UI/Button';
import './AuthLayout.scss';
import { useLocation } from 'react-router-dom';

const HomeLayout = ({ children }) => {
    const { pathname } = useLocation();
    const isLogin = pathname === '/login';

    return (
        <div className='container'>
            <div className='left-cotainer'>
                <div className='logo-image'>
                    <img src={logo} alt='PROZA' />
                </div>
            </div>
            <div className='right-container'>
                <header className='right-container__navigation'>
                    <Button
                        label='Назад'
                        type='transparent'
                        path='/'
                        leftIcon={<BsArrowLeft width={10} height={10} />}
                    />
                    <Button
                        label={isLogin ? 'Реєстрація' : 'Вхід'}
                        type='default'
                        path={isLogin ? '/signup' : '/login'}
                    />
                </header>
                <img
                    className='right-container__mobile-logo'
                    src={mobileLogo}
                    alt='proza'
                    width='350'
                    height='96'
                />
                {children}
            </div>
        </div>
    );
};

export default HomeLayout;
