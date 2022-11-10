import React from 'react';
import logo from '../../assets/images/logo.png';
import './Home.scss';
import '../../styles/global.scss';

const Button = (props) => {
    return (
        <button className='button'>{props.label}</button>
    );
}

const Home = () => {
    return (
        <div className='home-page'>
            <div className="divLeft" >
                <img src={logo} alt='PROZA' className='logo-image'/>
            </div>
            <div className="divRight">
                <div className='top-bar'>
                    <button className='but-1'>Вхід</button>
                    <div className='but-2'><Button label='Реєстрація' /></div>
                </div>
                <div className='home-content'>
                    <div className='home-content-title'><span>Кохай як Жадан, Фотографуйся як Іздрик</span></div>
                    <div className='home-content-entry'><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quibusdam exercitationem obcaecati corrupti aperiam rem blanditiis eum, commodi repudiandae eaque rerum natus totam, neque aspernatur porro maxime quasi fugiat omnis!</span></div>
                    <div className='nav-bar'>
                        <button className='but-3'>Вірші</button>
                        <button className='but-4'>Рецензії</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
