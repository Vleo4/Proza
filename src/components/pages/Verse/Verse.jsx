import Navbar from '../../UI/Navbar/Navbar';
import './Verse.scss';
import React, { useState } from 'react';
import Posts from '../../UI/Posts/Posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import Users from '../../UI/Users/Users';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AlertAddPost from '../../UI/AlertAddPost/AlertAddPost';
import addPost from '../../../assets/images/Posts/addPost.png';

const Verse = (props) => {
    const navigate = useNavigate();
    const { isAuthentificated } = useAuthContext();
    const isMobile = useResizer();
    const [active, setActive] = useState(false);
    const [author, setAuthor] = useState(null);
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'>
                    <InfiniteScroll
                        scrollableTarget='scrollableDiv'
                        next={props.fetchMoreData}
                        hasMore={props.hasMore}
                        loader={<h4>Loading..</h4>}
                        height={'95vh'}
                        dataLength={props.infinite.items.length}
                        endMessage={<p></p>}
                        className='infiniteMobile'>
                        {props.infinite.items.map((p, index) => (
                            <div className='verseMobileBlock' key={index}>
                                <PostsMobile
                                    tittle={p.title}
                                    content={p.content}
                                    id={p.id}
                                    key={index}></PostsMobile>
                            </div>
                        ))}
                    </InfiniteScroll>
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
                    <div className='verse-page-small'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className='verse-small'>
                            <div className='verse'>
                                <InfiniteScroll
                                    scrollableTarget='scrollableDiv'
                                    next={props.fetchMoreData}
                                    hasMore={props.hasMore}
                                    loader={<h4>Loading..</h4>}
                                    height={'100vh'}
                                    dataLength={props.infinite.items.length}
                                    endMessage={<p>LAST</p>}>
                                    {location.pathname === '/profile' ? (
                                        <>
                                            {' '}
                                            <AlertAddPost
                                                toggleAlert={toggleAlert}
                                                alert={alert}
                                                className='complaintAlert'
                                            />
                                            <div className='postsAdd'>
                                                <div className='text-parent'>
                                                    <img
                                                        src={addPost}
                                                        className='addPostSmall'
                                                        onClick={toggleAlert}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ''
                                    )}{' '}
                                    {props.infinite.items.map((p, index) => (
                                        <Posts
                                            setAuthor={setAuthor}
                                            user={p.user}
                                            tittle={p.title}
                                            content={p.content}
                                            id={p.id}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
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
                                        navigate('/register');
                                    }}>
                                    <a className='textR'>Реєстрація</a>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                        <div className='right-small'>
                            <Users
                                className='users'
                                author={author}
                                verseOne={'І жінка з чорними очима, як земля, волоссям\n'}
                                verseSecond={'І жінка з чорними очима, як земля, волоссям\n'}
                            />
                        </div>
                    </div>
                </>
            );
        }
        if (!active) {
            return (
                <>
                    <div className='verse-page' id='scrollableDiv'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className='verse-block'>
                            <InfiniteScroll
                                scrollableTarget='scrollableDiv'
                                next={props.fetchMoreData}
                                hasMore={props.hasMore}
                                loader={<h4>Loading..</h4>}
                                height={'100vh'}
                                dataLength={props.infinite.items.length}
                                endMessage={<p>LAST</p>}>
                                {location.pathname === '/profile' ? (
                                    <>
                                        {' '}
                                        <AlertAddPost
                                            toggleAlert={toggleAlert}
                                            alert={alert}
                                            className='complaintAlert'
                                        />
                                        <div className='postsAdd'>
                                            <div className='text-parent'>
                                                <img
                                                    src={addPost}
                                                    className='addPostSmall'
                                                    onClick={toggleAlert}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}{' '}
                                {props.infinite.items.map((p, index) => (
                                    <Posts
                                        setAuthor={setAuthor}
                                        user={p.user}
                                        tittle={p.title}
                                        content={p.content}
                                        id={p.id}
                                        key={index}></Posts>
                                ))}
                            </InfiniteScroll>
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
                        <div className='right'>
                            <Users
                                className='users'
                                author={author}
                                verseOne={'І жінка з чорними очима, як земля, волоссям\n'}
                                verseSecond={'І жінка з чорними очима, як земля, волоссям\n'}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Verse;
