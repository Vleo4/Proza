import React, { useState } from 'react';
import './Home.scss';
import '../../../styles/globals.scss';
import Button from 'components/UI/Button';
import Navbar from '../../UI/Navbar/Navbar';

const Home = () => {
    const [active, setActive] = useState(false);
    return (
        <>
            <Navbar active={active} setActive={setActive} />
            <div className='home-page'>
                <div className='top-bar'>
                    <div className='top-content'>
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
                <div className='content'></div>
            </div>
        </>
    );
};
export default Home;
