import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useResizer from '../../../utils/utils';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import Navbar from '../../UI/Navbar/Navbar';
import Posts from '../../UI/Posts/Posts';
import axios from 'axios';
import './ArticleID.scss';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search from '../../UI/Search/Search';
import RightTop from '../../UI/RightTop/RightTop';

const ArticleID = () => {
    const [comment, setComment] = useState(false);
    const changeComment = () => {
        setComment(!comment);
    };

    const navigate = useNavigate();
    const { isAuthentificated } = useAuthContext();
    let { id } = useParams();
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        const getData = () => {
            axios
                .get(apiURL + 'article/' + id + '/?format=json')
                .then((response) => {
                    setState(response.data);
                })
                .catch(function () {});
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
                    <div className='infiniteMobile'>
                        <div className={comment ? 'verseMobileBlockComment' : 'verseMobileBlock'}>
                            <PostsMobile
                                comment={comment}
                                setComment={changeComment}
                                author={state.user}
                                tittle={state.title}
                                content={state.content}
                                id={state.id}></PostsMobile>
                        </div>
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
                        <div
                            className={
                                comment ? 'verse-smallArticleComment' : 'verse-smallArticle'
                            }>
                            <Posts
                                author={state.user}
                                tittle={state.title}
                                content={state.content}
                                id={state.id}
                                comment={comment}
                                setComment={changeComment}></Posts>
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
                            <RightTop className='users' />
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
                        <div
                            className={
                                comment ? 'verse-blockArticleComment' : 'verse-blockArticle'
                            }>
                            <Posts
                                tittle={state.title}
                                content={state.content}
                                author={state.user}
                                id={state.id}
                                comment={comment}
                                setComment={changeComment}></Posts>
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
                            <RightTop className='users' />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default ArticleID;
