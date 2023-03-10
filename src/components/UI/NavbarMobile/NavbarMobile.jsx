import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarMobile.scss';
import verse from '../../../assets/images/navbar/verse.png';
import recommendation from '../../../assets/images/navbar/recommendation.png';
import profile from '../../../assets/images/navbar/profile.png';
import categories from '../../../assets/images/navbar/categories.png';
import saves from '../../../assets/images/navbar/saves.png';
import { useAuthContext } from '../../../contexts/AuthContext';
const Navbar = () => {
    const { isAuthentificated } = useAuthContext();
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

                    <li className={location.pathname === '/profile' ? 'active' : 'not-active'}>
                        <Link to={isAuthentificated ? '/profile' : '/login'}>
                            <img className='icon-mobile' src={profile} alt={'profile'} />
                        </Link>
                    </li>
                    <li className={location.pathname === '/categories' ? 'active' : 'not-active'}>
                        <Link to={isAuthentificated ? '/categories' : '/login'}>
                            <img className='icon-mobile' src={categories} alt={'categories'} />
                        </Link>
                    </li>
                    <li className={location.pathname === '/saves' ? 'active' : 'not-active'}>
                        <Link to={isAuthentificated ? '/saves' : '/login'}>
                            <img className='icon-mobile' src={saves} alt={'saves'} />
                        </Link>
                    </li>

                    <li className={location.pathname === '/profile' ? 'active' : 'not-active'}>
                        <Link to={isAuthentificated ? '/profile' : '/login'}>
                            <img className='icon-mobile' src={profile} alt={'profile'} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
