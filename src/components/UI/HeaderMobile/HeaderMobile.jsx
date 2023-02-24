import './HeaderMobile.scss';
import logo from '../../../assets/images/portrait.png';
import proza from '../../../assets/images/proza.svg';
import guest from '../../../assets/images/Header/Guest.png';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
const HeaderMobile = () => {
    const { isAuthentificated } = useAuthContext();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [author, setAuthor] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        if (isAuthentificated) {
            axios
                .get(apiURL + 'prozauserprofile/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    setAuthor(response.data.user);
                });
        }
    });
    return (
        <div className='headerMobile-verse'>
            <img src={logo} className='logo' alt='logo' />
            <img src={proza} className='proza' alt='proza' />
            {!isAuthentificated ? (
                <Link to={'/login'}>Гість</Link>
            ) : (
                <Link to={'/profile'}>{author}</Link>
            )}
            <img src={guest} className='guest' alt='guest' />
        </div>
    );
};

export default HeaderMobile;
