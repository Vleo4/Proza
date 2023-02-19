import Navbar from '../../UI/Navbar/Navbar';
import './Verse.scss';
import React, { useState } from 'react';
import Posts from '../../UI/Posts/Posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import Users from '../../UI/Users';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';

const Verse = (props) => {
    const isMobile = useResizer();
    const [active, setActive] = useState(false);
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
                                    author={p.author}
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
                                    next={props.fetchMoreData}
                                    hasMore={props.hasMore}
                                    loader={<h4>Loading..</h4>}
                                    height={'100vh'}
                                    dataLength={props.infinite.items.length}
                                    endMessage={<p>LAST</p>}>
                                    {props.infinite.items.map((p, index) => (
                                        <Posts
                                            tittle={p.title}
                                            content={p.content}
                                            id={p.id}
                                            key={index}></Posts>
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='right-small'>
                            <Users
                                className='users'
                                author={'Анастасія Костирка'}
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
                    <div className='verse-page' style={{ overflow: 'auto' }} id='scrollableDiv'>
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
                                {props.infinite.items.map((p, index) => (
                                    <Posts
                                        tittle={p.title}
                                        content={p.content}
                                        id={p.id}
                                        key={index}></Posts>
                                ))}
                            </InfiniteScroll>
                        </div>

                        <div className='right'>
                            <Users
                                className='users'
                                author={'Анастасія Костирка'}
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
