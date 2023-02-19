import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useResizer from '../../../utils/utils';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import PostsMobile from '../../UI/PostsMobile/PostsMobile';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import Navbar from '../../UI/Navbar/Navbar';
import Posts from '../../UI/Posts/Posts';
import Users from '../../UI/Users';
import './ArticleID.scss';
import axios from 'axios';
const ArticleID = () => {
    let { id } = useParams();
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        const getData = () => {
            axios.get(apiURL + 'article/' + id + '/?format=json').then((response) => {
                console.log(response.data);
                setState(response.data);
            });
        };
        getData();
    }, []);

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
                    <div className='verse-page-small'>
                        <Navbar className='navBar' active={active} setActive={setActive} />
                        <div className='verse-small'>
                            <div className='verse'>
                                <Posts
                                    tittle={state.title}
                                    content={state.content}
                                    id={state.id}></Posts>
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
                            <Posts
                                tittle={state.title}
                                content={state.content}
                                id={state.id}></Posts>
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

export default ArticleID;
