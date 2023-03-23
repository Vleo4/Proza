import './HeaderMobile.scss';
import logo from '../../../assets/images/portrait.png';
import proza from '../../../assets/images/proza.svg';
import guest from '../../../assets/images/Header/Guest.png';
import portrait from '../../../assets/images/portrait.svg';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import useDebounce from '../../../utils/useDebounce';
import api from '../../../api';
const HeaderMobile = () => {
    const { isAuthentificated } = useAuthContext();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [author, setAuthor] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (!debouncedSearch) {
            setPosts([]);
            return;
        }

        const loadSearch = async () => {
            try {
                setLoading(true);
                const searchData = await api.posts.search(debouncedSearch);
                setPosts(searchData);
            } catch (e) {
                setPosts([]);
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadSearch();
    }, [debouncedSearch]);
    const [jpg, setJpg] = useState(null);
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
                    setJpg(response.data.photo);
                });
        }
    });
    const navigate = useNavigate();
    return (
        <>
            <form className='searchMobile'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Пошук...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    content='width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no'
                />
                {search && (
                    <div className='listMobile'>
                        {isLoading ? (
                            <span className='list__loading'>Loading...</span>
                        ) : (
                            posts.map((post) => (
                                <Link
                                    className='listMobile'
                                    to={'/article/' + post.id}
                                    key={post.id}>
                                    {post.title}
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </form>
            <div className='headerMobile-verse'>
                <img
                    src={logo}
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    className='logo'
                    alt='logo'
                />
                <img
                    src={proza}
                    onClick={() => {
                        navigate('/');
                    }}
                    className='proza'
                    alt='proza'
                />

                {!isAuthentificated ? (
                    <>
                        <Link to={'/login'}>Гість</Link>
                        <img src={guest} className='guest' alt='guest' />
                    </>
                ) : (
                    <>
                        <Link to={'/profile'} className='authorTxt'>
                            {author}
                        </Link>
                        <img src={jpg ? jpg : portrait} className='guest' alt='guest' />
                    </>
                )}
            </div>
        </>
    );
};

export default HeaderMobile;
