import React from 'react';
import './Home.scss';
import '../../../styles/globals.scss';
import portrait from '../../../assets/images/portrait.svg';
import proza from '../../../assets/images/proza.svg';
//import { useMediaQuery } from 'react-responsive';
import Button from 'components/UI/Button';

const Home = () => {
    return (
        <div className='home-page'>
            <div className='top-bar'>
                <div className='top-content'>
                    <div className='logo-images'>
                        <span className='portrait-image'>
                            <img src={portrait} alt='portrait' />
                        </span>
                        <span className='proza-image'>
                            <img src={proza} alt='proza' />
                        </span>
                    </div>
                    <div className='buttons'>
                        <Button label='Вхід' type='bordered' path='/login' className='but-1' />
                        <Button
                            label='Реєстрація'
                            type='default'
                            path='/signup'
                            className='but-2'
                        />
                    </div>
                </div>
            </div>
            <div className='side-bar'></div>
            <div className='content'></div>
        </div>
    );
};

export default Home;
