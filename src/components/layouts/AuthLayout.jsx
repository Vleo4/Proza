import React from 'react';
import './AuthLayout.scss';
import logo from '../../assets/images/logo.png';

const HomeLayout = ({ children }) => {
    return (
        <div className='container'>
            <div className='left-cotainer'>
                <div className='logo-image'>
                    <img src={logo} alt='PROZA' />
                </div>
            </div>
            <div className='right-container'>
                <div className='children'>{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
