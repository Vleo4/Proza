import Navbar from '../../UI/Navbar/Navbar';
import './Verse.scss';
import React, { useState } from 'react';
import Posts from '../../UI/Posts/Posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import Users from '../../UI/Users';
import axios from 'axios';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';

const Verse = () => {
    const postsProps = [
        {
            tittle: 'І жінка з чорними очима, як земля, волоссям\n',
            content: 'abc',
            id: '1',
            author: 'Анастасія Костирка'
        },
        {
            tittle: 'Площею прогулювалося кільканадцять\n',
            content:
                "As I walk through the valley of the shadow of death\\r\\nI take a look at my life and realize there's not much left\\r\\n'Cause I've been blastin' and laughin' so long, that\\r\\nEven my mama thinks that my mind is gone\\r\\nBut I ain't never crossed a man that didn't deserve it\\r\\nMe be treated like a punk, you know that's unheard of\\r\\nYou better watch how you're talkin', and where you're walkin'\\r\\nOr you and your homies might be lined in chalk\\r\\nI really hate to trip but I gotta loc\\r\\nAs they croak, I see myself in the pistol smoke, fool\\r\\nI'm the kinda G the little homies wanna be like\\r\\nOn my knees in the night, sayin' prayers in the streetlight",
            id: '2',
            author: 'No Ananas'
        }
    ];
    const isMobile = useResizer();
    const [infinite, setInfinite] = useState({ items: [] });
    const [state, setState] = useState(null);
    const [indexCount, setIndexCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        setInfinite({ items: [...infinite.items, state.items[indexCount]] });
        setIndexCount(indexCount + 1);
        if (indexCount === state.items.length - 1) setHasMore(false);
    };
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'article/?format=json').then((response) => {
            console.log(response.data);
            setState({ items: response.data });
            setInfinite({ items: [response.data[0], response.data[1]] });
        });
    }, []);
    const [active, setActive] = useState(false);
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <div className='headerMobile-verse'>HEADER</div>{' '}
                <InfiniteScroll
                    scrollableTarget='scrollableDiv'
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading..</h4>}
                    height={'95vh'}
                    dataLength={infinite.items.length}
                    endMessage={<p>LAST</p>}
                    className='infiniteMobile'
                    style={{ overflowY: 'visible' }}>
                    {infinite.items.map((p, index) => (
                        <div className='verseMobileBlock' key={index}>
                            <PostsMobile
                                author={p.author}
                                content={p.content}
                                key={index}></PostsMobile>
                        </div>
                    ))}
                </InfiniteScroll>
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
                                    {infinite.items.map((p, index) => (
                                        <Posts
                                            tittle={p.title}
                                            content={p.content}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='right-small'>
                            <Users className='users' />
                        </div>
                    </div>
                </>
            );
        }
        if (!active) {
            return (
                <div className='verse-page' style={{ overflow: 'auto' }} id='scrollableDiv'>
                    <Navbar className='navBar' active={active} setActive={setActive} />
                    <div className='verse-block'>
                        <InfiniteScroll
                            scrollableTarget='scrollableDiv'
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading..</h4>}
                            height={'100vh'}
                            dataLength={infinite.items.length}
                            endMessage={<p>LAST</p>}>
                            {infinite.items.map((p, index) => (
                                <Posts tittle={p.title} content={p.content} key={index}></Posts>
                            ))}
                        </InfiniteScroll>
                    </div>

                    <div className='right'>
                        <Users
                            className='users'
                            author={postsProps[0].author}
                            verseOne={postsProps[0].tittle}
                            verseSecond={postsProps[0].tittle}
                        />
                    </div>
                </div>
            );
        }
    }
};

export default Verse;
