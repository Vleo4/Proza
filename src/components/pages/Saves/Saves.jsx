import React, { useState } from 'react';
import axios from 'axios';
import Verse from '../Verse/Verse';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import useResizer from '../../../utils/utils';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import Navbar from '../../UI/Navbar/Navbar';
import RightTop from '../../UI/RightTop/RightTop';
import '../Articleid/ArticleID.scss';
import Search from '../../UI/Search/Search';
const Saves = () => {
    const [author, setAuthor] = useState(null);
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [infinite, setInfinite] = useState({ items: [] });
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/login');
        }
    }, [isAuthentificated, isAuthLoading]);
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios
            .get(apiURL + 'savedarticles/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
                if (response.data.length === 1) {
                    setAuthor(response.data[0].user);
                    setState(response.data[0]);
                    setInfinite({ items: [response.data[0]] });
                } else if (!response.data.length) {
                    setAuthor(null);
                    setState({
                        id: '',
                        user: '',
                        cat: '',
                        title: '',
                        content: '',
                        author: '',
                        count_of_likes: 0,
                        count_of_reviews: 0
                    });
                } else if (response.data.length === 2) {
                    setAuthor(response.data[0].user);
                    setState({ items: response.data });
                    setInfinite({ items: [response.data[0], response.data[1]] });
                    setHasMore(false);
                } else {
                    setAuthor(response.data[0].user);
                    setState({ items: response.data });
                    setInfinite({ items: [response.data[0], response.data[1]] });
                }
            });
    }, []);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    const isMobile = useResizer();
    const [active, setActive] = useState(null);
    if (!state) {
        return <h1>Loading...</h1>;
    }
    if (!author) {
        if (isMobile)
            return (
                <>
                    <div className='mobile-verse'>
                        <HeaderMobile />
                        <div className='mobileMiddle'>
                            <div className='infiniteMobile'>
                                <div className='verseMobileBlock'>
                                    <div className='postsMobile'>
                                        <div className='header-two'>У ВАС НЕМАЄ ЗБЕРЕЖЕНИХ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className='footerMobile-verse'>
                            <NavbarMobile />
                        </footer>
                    </div>
                </>
            );
        else {
            if (active)
                return (
                    <>
                        <div className='verse-page-smallArticle'>
                            <Navbar className='navBar' active={active} setActive={setActive} />
                            <div className='verse-smallArticle'>
                                <div className='verse'>
                                    <div className='postsArticle'>
                                        <div className='header-two'>У ВАС НЕМАЄ ЗБЕРЕЖЕНИХ</div>
                                    </div>
                                </div>
                            </div>
                            <div className='right-smallArticle'>
                                <Search />
                                <RightTop />
                            </div>
                        </div>
                    </>
                );
            if (!active)
                return (
                    <>
                        <div
                            className='verse-pageArticle'
                            style={{ overflow: 'auto' }}
                            id='scrollableDiv'>
                            <Navbar className='navBar' active={active} setActive={setActive} />
                            <div className='verse-blockArticle'>
                                <div className='verse'>
                                    <div className='postsArticle'>
                                        <div className='header-two'>У ВАС НЕМАЄ ЗБЕРЕЖЕНИХ</div>
                                    </div>
                                </div>
                            </div>
                            <div className='rightArticle'>
                                <Search />
                                <RightTop />
                            </div>
                        </div>
                    </>
                );
        }
    } else {
        return (
            <Verse
                state={state}
                author={author}
                infinite={infinite}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
            />
        );
    }
};

export default Saves;
