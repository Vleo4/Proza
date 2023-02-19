import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import burger from '../../../assets/images/navbar/burger.png';
import verse from '../../../assets/images/navbar/verse.png';
import recommendation from '../../../assets/images/navbar/recommendation.png';
import notifications from '../../../assets/images/navbar/notifications.png';
import likes from '../../../assets/images/navbar/likes.png';
import saves from '../../../assets/images/navbar/saves.png';
import profile from '../../../assets/images/navbar/profile.png';
import settings from '../../../assets/images/navbar/settings.png';
import logo from '../../../assets/images/portrait.png';
import proza from '../../../assets/images/proza.svg';
const Navbar = (props) => {
    const [isShownVerse, setIsShownVerse] = useState(false);
    const [isShownRecommendation, setIsShownRecommendation] = useState(false);
    const [isShownNotifications, setIsShownNotifications] = useState(false);
    const [isShownLikes, setIsShownLikes] = useState(false);
    const [isShownSaves, setIsShownSaves] = useState(false);
    const [isShownProfile, setIsShownProfile] = useState(false);
    const [isShownSettings, setIsShownSettings] = useState(false);

    const activateNav = () => {
        props.setActive(!props.active);
    };
    return (
        <div className={props.active ? 'header' : 'header-mobile'}>
            <nav>
                <ul className={props.active ? 'ul-item full' : 'ul-item icon'}>
                    <li className={'logo'}>
                        <Link to='/'>
                            <img className={'logoProza'} src={logo} alt={'burger'} />
                        </Link>
                        <Link to='/' className={'show'}>
                            <img src={proza} alt={'proza'} />
                        </Link>
                    </li>
                    <li
                        className={location.pathname === '/article' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownVerse(true)}
                        onMouseLeave={() => setIsShownVerse(false)}>
                        <Link to='/article'>
                            <img className='icon' src={verse} alt={'article'} />
                        </Link>
                        <Link to='/article' className={isShownVerse ? '' : 'show'}>
                            Вірші
                        </Link>
                    </li>

                    <li
                        className={
                            location.pathname === '/recommendation' ? 'active' : 'not-active'
                        }
                        onMouseOver={() => setIsShownRecommendation(true)}
                        onMouseLeave={() => setIsShownRecommendation(false)}>
                        <Link to='/recommendation'>
                            <img className='icon' src={recommendation} alt={'recommendation'} />
                        </Link>
                        <Link to='/recommendation' className={isShownRecommendation ? '' : 'show'}>
                            Рекомендації
                        </Link>
                    </li>

                    <li
                        className={location.pathname === '/notifications' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownNotifications(true)}
                        onMouseLeave={() => setIsShownNotifications(false)}>
                        <Link to='/notifications'>
                            <img src={notifications} className='icon' alt={'notifications'} />
                        </Link>
                        <Link to='/notifications' className={isShownNotifications ? '' : 'show'}>
                            Сповіщення
                        </Link>
                    </li>

                    <li
                        className={location.pathname === '/likes' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownLikes(true)}
                        onMouseLeave={() => setIsShownLikes(false)}>
                        <Link to='/likes'>
                            <img className='icon' src={likes} alt={'likes'} />
                        </Link>
                        <Link to='/rec' className={isShownLikes ? '' : 'show'}>
                            Вподобані
                        </Link>
                    </li>

                    <li
                        className={location.pathname === '/saves' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownSaves(true)}
                        onMouseLeave={() => setIsShownSaves(false)}>
                        <Link to='/saves'>
                            <img className='icon' src={saves} alt={'saves'} />
                        </Link>
                        <Link to='/' className={isShownSaves ? '' : 'show'}>
                            Збережені
                        </Link>
                    </li>

                    <li
                        className={location.pathname === '/profile' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownProfile(true)}
                        onMouseLeave={() => setIsShownProfile(false)}>
                        <Link to='/profile'>
                            <img className='icon' src={profile} alt={'profile'} />
                        </Link>
                        <Link to='/' className={isShownProfile ? '' : 'show'}>
                            Мій профіль
                        </Link>
                    </li>
                    <li
                        className={location.pathname === '/settings' ? 'active' : 'not-active'}
                        onMouseOver={() => setIsShownSettings(true)}
                        onMouseLeave={() => setIsShownSettings(false)}>
                        <Link to='/settings'>
                            <img className='icon' src={settings} alt={'settings'} />
                        </Link>
                        <Link to='/' className={isShownSettings ? '' : 'show'}>
                            Налаштування
                        </Link>
                    </li>
                    <li className='not-active' onClick={activateNav}>
                        <img className='icon' src={burger} alt={'burger'} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
