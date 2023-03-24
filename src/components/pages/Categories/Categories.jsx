import Navbar from '../../UI/Navbar/Navbar';
import '../Verse/Verse.scss';
import React, { useState } from 'react';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import CategoriesMiddle from '../../UI/CategoriesMiddle/CategoriesMiddle';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlertAddPost from '../../UI/AlertAddPost/AlertAddPost';
import addPost from '../../../assets/images/Posts/addPost.png';
import Posts from '../../UI/Posts/Posts';
import axios from 'axios';
import RightTop from '../../UI/RightTop/RightTop';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search from '../../UI/Search/Search';
import CategoriesMiddleMobile from '../../UI/CategoriesMiddleMobile/CategoriesMiddleMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';

const Categories = () => {
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const [category, setCategory] = useState(null);
    React.useEffect(() => {
        const cat = category + 1;
        axios.get(apiURL + 'getarticlesfromcategory/' + cat + '/?format=json').then((response) => {
            if (response.data.length === 1) {
                setState(response.data[0]);
                setInfinite({ items: [response.data[0]] });
            } else if (!response.data.length) {
                setInfinite({ items: [] });
            } else if (response.data.length === 2) {
                setState({ items: response.data });
                setInfinite({ items: [response.data[0], response.data[1]] });
                setHasMore({ items: [] });
            } else {
                setState({ items: response.data });
                setInfinite({ items: [response.data[0], response.data[1]] });
            }
        });
    }, [category]);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    const isMobile = useResizer();
    const [active, setActive] = useState(null);
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'>
                    <InfiniteScroll
                        scrollableTarget='scrollableDiv'
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4></h4>}
                        height={'95vh'}
                        dataLength={infinite.items.length}
                        endMessage={<p></p>}
                        className='infiniteMobile'>
                        <div className='infiniteMobile'>
                            <div className='verseMobileBlock'>
                                <CategoriesMiddleMobile
                                    category={category}
                                    setCategory={setCategory}
                                />
                            </div>
                        </div>
                        {infinite.items.map((p, index) => (
                            <div className='verseMobileBlock' key={index}>
                                <PostsMobile
                                    author={p.user}
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
                                {' '}
                                <InfiniteScroll
                                    scrollableTarget='scrollableDiv'
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    loader={<h4>Loading..</h4>}
                                    height={'100vh'}
                                    dataLength={infinite.items.length}
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
                                                        alt='addPost'
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
                                    <CategoriesMiddle
                                        category={category}
                                        setCategory={setCategory}
                                    />
                                    {infinite.items.map((p, index) => (
                                        <Posts
                                            author={p.user}
                                            user={p.user}
                                            tittle={p.title}
                                            content={p.content}
                                            id={p.id}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='right-small'>
                            <div className='users'>
                                <Search />
                                <RightTop className='users' />
                            </div>
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
                            <div className='verse'>
                                <InfiniteScroll
                                    scrollableTarget='scrollableDiv'
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    loader={<h4>Loading..</h4>}
                                    height={'100vh'}
                                    dataLength={infinite.items.length}
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
                                                        alt='addPost'
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
                                    <CategoriesMiddle
                                        category={category}
                                        setCategory={setCategory}
                                    />
                                    {infinite.items.map((p, index) => (
                                        <Posts
                                            author={p.user}
                                            tittle={p.title}
                                            content={p.content}
                                            id={p.id}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='right'>
                            <Search />
                            <RightTop className='users' />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Categories;
