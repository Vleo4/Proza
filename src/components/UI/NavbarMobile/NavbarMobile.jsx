import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarMobile.scss';
import burger from '../../../assets/images/navbar/burger.png';
import verse from '../../../assets/images/navbar/verse.png';
import recommendation from '../../../assets/images/navbar/recommendation.png';
import profile from '../../../assets/images/navbar/profile.png';
import settings from '../../../assets/images/navbar/settings.png';
const Navbar = () => {
    return (
        <div className={'navbar-mobile'}>
            <nav>
                <ul className={'ul-mobile'}>
                    <li className={location.pathname === '/article' ? 'active' : 'not-active'}>
                        <Link to='/article'>
                            <img className='icon-mobile' src={verse} alt={'verse'} />
                        </Link>
                    </li>

                    <li className={location.pathname === '/' ? 'active' : 'not-active'}>
                        <Link to='/'>
                            <img
                                className='icon-mobile'
                                src={recommendation}
                                alt={'recommendation'}
                            />
                        </Link>
                    </li>

                    <li className={location.pathname === '/profile/' ? 'active' : 'not-active'}>
                        <Link to='/profile/'>
                            <img className='icon-mobile' src={profile} alt={'profile'} />
                        </Link>
                    </li>

                    <li className={location.pathname === '/settings' ? 'active' : 'not-active'}>
                        <Link to='/settings'>
                            <img className='icon-mobile' src={settings} alt={'settings'} />
                        </Link>
                    </li>
                    <li className='not-active'>
                        <a>
                            <img className='icon-mobile' src={burger} alt={'burger'} />
                        </a>
                    </li>
                    {/*  <li className={location.pathname === '/saves' ? 'active' : 'not-active'}>
                        <Link to='/saves'>
                            <img className='icon-mobile' src={saves} alt={'saves'} />
                        </Link>
                        <li
                            className={
                                location.pathname === '/notifications' ? 'active' : 'not-active'
                            }>
                            <Link to='/notifications'>
                                <img
                                    src={notifications}
                                    className='icon-mobile'
                                    alt={'notifications'}
                                />
                            </Link>
                        </li>

                        <li className={location.pathname === '/likes' ? 'active' : 'not-active'}>
                            <Link to='/likes'>
                                <img className='icon-mobile' src={likes} alt={'likes'} />
                            </Link>
                        </li>
                    </li>*/}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
