import Navbar from '../../UI/Navbar/Navbar';
import './Verse.scss';
import React, { useEffect, useState } from 'react';
import Posts from '../../UI/Posts/Posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import Users from '../../UI/Users/Users';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import AlertAddPost from '../../UI/AlertAddPost/AlertAddPost';
import addPost from '../../../assets/images/Posts/addPost.png';
import Search from '../../UI/Search/Search';
import RightTop from '../../UI/RightTop/RightTop';
import ProfileHeader from '../../UI/ProfileHeader/ProfileHeader';
import AlertAddPostMobile from '../../UI/AlertAddPostMobile/AlertAddPostMobile';
import portrait from '../../../assets/images/portrait.svg';
import CategoriesMiddle from '../../UI/CategoriesMiddle/CategoriesMiddle';
import CategoriesMiddleMobile from '../../UI/CategoriesMiddleMobile/CategoriesMiddleMobile';
import { getCurrentUser } from '../../../api/requests';
const Verse = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { isAuthentificated } = useAuthContext();
    const isMobile = useResizer();
    const [active, setActive] = useState(null);
    const [comment, setComment] = React.useState([false, false]);
    const toggleComment = (p) => {
        setComment((prevComment) => ({
            ...prevComment,
            [p]: !prevComment[p]
        }));
    };
    const [jpg, setJpg] = useState(null);
    const [current, setCurrent] = useState(null);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                setJpg(data.photo);
                setCurrent(data.user);
            }
        }
        fetchData();
    }, [isAuthentificated]);
    if (isMobile) {
        return (
            <>
                <div className='mobile-verse' style={{ overflow: 'hidden' }}>
                    <HeaderMobile />
                    <div className='mobileMiddle' style={{ overflow: 'hidden' }}>
                        <InfiniteScroll
                            scrollableTarget='scrollableDiv'
                            next={props.fetchMoreData}
                            hasMore={props.hasMore}
                            loader={<h4></h4>}
                            height={'95vh'}
                            dataLength={props.infinite.items.length}
                            endMessage={
                                <div className='endPostMobile'>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            className='infiniteMobile'>
                            {location.pathname === '/profile' ||
                            location.pathname === '/profile/' + id ? (
                                <>
                                    <div className='infiniteMobile'>
                                        <div className='verseHeaderMobileBlock'>
                                            <ProfileHeader author={props.author} />
                                        </div>
                                        {location.pathname === '/profile' ||
                                        location.pathname === '/profile/' + current ? (
                                            <>
                                                <AlertAddPostMobile
                                                    toggleAlert={props.toggleAlert}
                                                    alert={props.alert}
                                                    className='complaintAlert'
                                                />
                                                <div className='verseAddSmallMobileBlock'>
                                                    <div className='postsAddMobile'>
                                                        <div className='text-parent'>
                                                            <img
                                                                src={addPost}
                                                                className='addPostSmallMobile'
                                                                onClick={props.toggleAlert}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {location.pathname === '/categories' ? (
                                <CategoriesMiddleMobile
                                    category={props.category}
                                    setCategory={props.setCategory}
                                />
                            ) : (
                                <></>
                            )}
                            {props.infinite.items.map((p, index) => (
                                <div
                                    className={
                                        comment[index]
                                            ? 'verseMobileBlockComment'
                                            : 'verseMobileBlock'
                                    }
                                    key={index}>
                                    <PostsMobile
                                        comment={comment[index]}
                                        setComment={toggleComment}
                                        author={p.user}
                                        tittle={p.title}
                                        content={p.content}
                                        id={p.id}
                                        index={index}
                                        key={index}></PostsMobile>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                    <footer className='footerMobile-verse'>
                        <NavbarMobile />
                    </footer>
                </div>
            </>
        );
    } else {
        if (active) {
            return (
                <>
                    <div className='verse-page-small'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className={'verse-small'}>
                            <div className='verse'>
                                {props.infinite.items[0] ? (
                                    <InfiniteScroll
                                        scrollableTarget='scrollableDiv'
                                        next={props.fetchMoreData}
                                        hasMore={props.hasMore}
                                        loader={<h4>Loading..</h4>}
                                        height={'100vh'}
                                        dataLength={props.infinite.items.length}
                                        endMessage={
                                            <div className='endPost'>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        }>
                                        {location.pathname === '/categories' ? (
                                            <CategoriesMiddle
                                                category={props.category}
                                                setCategory={props.setCategory}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {location.pathname === '/profile' ||
                                        location.pathname === '/profile/' + id ? (
                                            <>
                                                {location.pathname === '/profile' ||
                                                location.pathname === '/profile/' + current ? (
                                                    <>
                                                        <AlertAddPost
                                                            toggleAlert={props.toggleAlert}
                                                            alert={props.alert}
                                                        />
                                                        <div className='postsAdd'>
                                                            <div className='text-parent'>
                                                                <img
                                                                    src={addPost}
                                                                    className='addPostSmall'
                                                                    onClick={props.toggleAlert}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        ) : (
                                            ''
                                        )}{' '}
                                        {props.infinite.items.map((p, index) => (
                                            <Posts
                                                tittle={p.title}
                                                author={p.user}
                                                content={p.content}
                                                id={p.id}
                                                key={index}></Posts>
                                        ))}
                                    </InfiniteScroll>
                                ) : (
                                    <></>
                                )}
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
                            <Search />
                            {location.pathname === '/profile' ||
                            location.pathname === '/profile/' + id ? (
                                <>
                                    <Users className='users' author={props.author} />
                                </>
                            ) : (
                                <>
                                    <RightTop className='users' />
                                </>
                            )}
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
                        <div className={'verse-block'}>
                            {props.infinite.items[0] ? (
                                <InfiniteScroll
                                    scrollableTarget='scrollableDiv'
                                    next={props.fetchMoreData}
                                    hasMore={props.hasMore}
                                    loader={<h4>Loading..</h4>}
                                    height={'100vh'}
                                    dataLength={props.infinite.items.length}
                                    endMessage={
                                        <div className='endPost'>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    }>
                                    {location.pathname === '/categories' ? (
                                        <CategoriesMiddle
                                            category={props.category}
                                            setCategory={props.setCategory}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {location.pathname === '/profile' ||
                                    location.pathname === '/profile/' + id ? (
                                        <>
                                            {location.pathname === '/profile' ||
                                            location.pathname === '/profile/' + current ? (
                                                <>
                                                    <AlertAddPost
                                                        toggleAlert={props.toggleAlert}
                                                        alert={props.alert}
                                                    />
                                                    <div className='postsAdd'>
                                                        <div className='text-parent'>
                                                            <img
                                                                src={addPost}
                                                                className='addPostSmall'
                                                                onClick={props.toggleAlert}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        ''
                                    )}{' '}
                                    {props.infinite.items.map((p, index) => (
                                        <Posts
                                            author={p.user}
                                            tittle={p.title}
                                            content={p.content}
                                            id={p.id}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
                            ) : (
                                <></>
                            )}
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
                            <div
                                className='rightProf'
                                onClick={() => {
                                    navigate('/profile');
                                }}>
                                <img src={jpg ? jpg : portrait} />
                                <a className='textProf'>{current}</a>
                            </div>
                        )}
                        <div className='right'>
                            <Search />
                            {location.pathname === '/profile' ||
                            location.pathname === '/profile/' + id ? (
                                <>
                                    <Users className='users' author={props.author} />
                                </>
                            ) : (
                                <>
                                    <RightTop className='users' />
                                </>
                            )}
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Verse;
