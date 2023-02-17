import Navbar from '../../UI/Navbar';
import './Verse.scss';
import React, { useState } from 'react';
import Posts from '../../UI/Posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import Users from '../../UI/Users';
import axios from 'axios';

const Verse = () => {
    //const POSTS_PER_QUERY = 4;
    //запит поста
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
        },
        {
            tittle: 'Площею прогулювалося кільканадцять\n',
            content: 'abc',
            id: '3',
            author: 'Second Ananas'
        },
        {
            tittle: 'І жінка з чорними очима, як земля, волоссям\n',
            content:
                "As I walk through the valley of the shadow of death\\r\\nI take a look at my life and realize there's not much left\\r\\n'Cause I've been blastin' and laughin' so long, that\\r\\nEven my mama thinks that my mind is gone\\r\\nBut I ain't never crossed a man that didn't deserve it\\r\\nMe be treated like a punk, you know that's unheard of\\r\\nYou better watch how you're talkin', and where you're walkin'\\r\\nOr you and your homies might be lined in chalk\\r\\nI really hate to trip but I gotta loc\\r\\nAs they croak, I see myself in the pistol smoke, fool\\r\\nI'm the kinda G the little homies wanna be like\\r\\nOn my knees in the night, sayin' prayers in the streetlight",
            id: '4',
            author: 'Four Ananas'
        }
    ];
    // eslint-disable-next-line no-unused-vars
    const newPostsProps = [
        {
            tittle: 'І жінка з чорними очима, як земля, волоссям\n',
            content: 'abc',
            id: '5',
            author: 'Tripple Ananas'
        },
        {
            tittle: 'І жінка з чорними очима, як земля, волоссям\n',
            content:
                "As I walk through the valley of the shadow of death\\r\\nI take a look at my life and realize there's not much left\\r\\n'Cause I've been blastin' and laughin' so long, that\\r\\nEven my mama thinks that my mind is gone\\r\\nBut I ain't never crossed a man that didn't deserve it\\r\\nMe be treated like a punk, you know that's unheard of\\r\\nYou better watch how you're talkin', and where you're walkin'\\r\\nOr you and your homies might be lined in chalk\\r\\nI really hate to trip but I gotta loc\\r\\nAs they croak, I see myself in the pistol smoke, fool\\r\\nI'm the kinda G the little homies wanna be like\\r\\nOn my knees in the night, sayin' prayers in the streetlight",
            id: '6',
            author: 'No Ananas'
        }
    ];
    const [infinite, setInfinite] = useState({
        items: [
            {
                tittle: 'І жінка з чорними очима, як земля, волоссям\n',
                content:
                    "As I walk through the valley of the shadow of death\\r\\nI take a look at my life and realize there's not much left\\r\\n'Cause I've been blastin' and laughin' so long, that\\r\\nEven my mama thinks that my mind is gone\\r\\nBut I ain't never crossed a man that didn't deserve it\\r\\nMe be treated like a punk, you know that's unheard of\\r\\nYou better watch how you're talkin', and where you're walkin'\\r\\nOr you and your homies might be lined in chalk\\r\\nI really hate to trip but I gotta loc\\r\\nAs they croak, I see myself in the pistol smoke, fool\\r\\nI'm the kinda G the little homies wanna be like\\r\\nOn my knees in the night, sayin' prayers in the streetlight",
                id: '6',
                author: 'No Ananas'
            },
            {
                tittle: 'І жінка з чорними очима, як земля, волоссям\n',
                content:
                    "As I walk through the valley of the shadow of death\\r\\nI take a look at my life and realize there's not much left\\r\\n'Cause I've been blastin' and laughin' so long, that\\r\\nEven my mama thinks that my mind is gone\\r\\nBut I ain't never crossed a man that didn't deserve it\\r\\nMe be treated like a punk, you know that's unheard of\\r\\nYou better watch how you're talkin', and where you're walkin'\\r\\nOr you and your homies might be lined in chalk\\r\\nI really hate to trip but I gotta loc\\r\\nAs they croak, I see myself in the pistol smoke, fool\\r\\nI'm the kinda G the little homies wanna be like\\r\\nOn my knees in the night, sayin' prayers in the streetlight",
                id: '4',
                author: 'No Ananas'
            }
        ],
        hasMore: true,
        length: 0
    });
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState(null);
    const fetchMoreData = () => {
        console.log(state.items);
        setInfinite({ items: state.items });
        console.log(infinite);
    };
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'article/?format=json').then((response) => {
            setState({ items: response.data });
        });
    }, []);
    const [active, setActive] = useState(false);
    if (active) {
        return (
            <div className='verse-page-small'>
                <Navbar className='navBar' active={active} setActive={setActive} />
                <div className='verse-small'>
                    <div className='verse'>
                        {' '}
                        <InfiniteScroll
                            scrollableTarget='scrollableDiv'
                            next={fetchMoreData}
                            hasMore={infinite.hasMore}
                            loader={<h4>Loading..</h4>}
                            height={'100vh'}
                            dataLength={infinite.length}
                            endMessage={<p>LAST</p>}>
                            {infinite.items.map((p, index) => (
                                <Posts tittle={p.title} content={p.content} key={index}>
                                    {p}
                                </Posts>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
                <div className='right-small'>
                    <Users
                        className='users'
                        author={postsProps[0].author}
                        verseOne={postsProps[0].tittle}
                        verseSecond={postsProps[1].tittle}
                    />
                </div>
            </div>
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
                        hasMore={infinite.hasMore}
                        loader={<h4>Loading..</h4>}
                        height={'100vh'}
                        dataLength={infinite.length}
                        endMessage={<p>LAST</p>}>
                        {infinite.items.map((p, index) => (
                            <Posts tittle={p.title} content={p.content} key={index}>
                                {p}
                            </Posts>
                        ))}
                    </InfiniteScroll>
                </div>

                <div className='right'>
                    <Users
                        className='users'
                        author={postsProps[0].author}
                        verseOne={postsProps[0].tittle}
                        verseSecond={postsProps[2].tittle}
                    />
                </div>
            </div>
        );
    }
};

export default Verse;
