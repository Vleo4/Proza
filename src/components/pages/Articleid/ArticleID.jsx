import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useResizer from '../../../utils/utils';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import Navbar from '../../UI/Navbar/Navbar';
import Posts from '../../UI/Posts/Posts';
import Users from '../../UI/Users/Users';
import axios from 'axios';
import './ArticleID.scss';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search from '../../UI/Search/Search';

const ArticleID = () => {
    const navigate = useNavigate();
    const { isAuthentificated } = useAuthContext();
    const [author, setAuthor] = useState(null);
    let { id } = useParams();
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        const getData = () => {
            axios.get(apiURL + 'article/' + id + '/?format=json').then((response) => {
                setState(response.data);
                setAuthor(response.data.user);
            });
        };
        getData();
    }, [id]);

    const isMobile = useResizer();
    const [active, setActive] = useState(false);
    if (!state) {
        return <h1>Loading...</h1>;
    }
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'>
                    <div className='verseMobileBlock'>
                        <PostsMobile
                            author={state.author}
                            content={state.content}
                            id={state.id}></PostsMobile>
                    </div>
                </div>
                <footer className='footerMobile-verse'>
                    <NavbarMobile />
                </footer>
            </div>
        );
    } else {
        if (active) {
            return (
                <>
                    <div className='verse-page-smallArticle'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className='verse-smallArticle'>
                            <div className='verse'>
                                <Posts
                                    setAuthor={setAuthor}
                                    user={state.user}
                                    tittle={state.title}
                                    content={state.content}
                                    id={state.id}></Posts>
                            </div>
                        </div>
                        {!isAuthentificated ? (
                            <>
                                {' '}
                                <div
                                    className='right-btn'
                                    onClick={() => {
                                        navigate('/login');
                                    }}>
                                    <a className='textL'>Вхід</a>
                                </div>
                                <div
                                    className='right-btn2'
                                    onClick={() => {
                                        navigate('/signup');
                                    }}>
                                    <a className='textR'>Реєстрація</a>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                        <div className='right-smallArticle'>
                            <Search />
                            <Users className='users' author={author} />
                        </div>
                    </div>
                </>
            );
        }
        if (!active) {
            return (
                <>
                    <div
                        className='verse-pageArticle'
                        style={{ overflow: 'auto' }}
                        id='scrollableDiv'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className='verse-blockArticle'>
                            <Posts
                                tittle={state.title}
                                content={state.content}
                                user={state.user}
                                setAuthor={setAuthor}
                                id={state.id}></Posts>
                        </div>
                        {!isAuthentificated ? (
                            <>
                                {' '}
                                <div
                                    className='right-btn'
                                    onClick={() => {
                                        navigate('/login');
                                    }}>
                                    <a className='textL'>Вхід</a>
                                </div>
                                <div
                                    className='right-btn2'
                                    onClick={() => {
                                        navigate('/signup');
                                    }}>
                                    <a className='textR'>Реєстрація</a>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                        <div className='rightArticle'>
                            <Search />
                            <Users className='users' author={author} />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default ArticleID;
