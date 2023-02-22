import Navbar from '../../UI/Navbar/Navbar';
import '../Verse/Verse.scss';
import React, { useState } from 'react';
import Users from '../../UI/Users/Users';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import PostsAdd from '../../UI/PostsAdd/PostsAdd';
import axios from 'axios';

const VerseAdd = (props) => {
    const isMobile = useResizer();
    const [author, setAuthor] = useState(null);
    const [active, setActive] = useState(false);
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios
            .get(apiURL + 'prozauserprofile/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + props.accessToken
                }
            })
            .then((response) => {
                setAuthor(response.data.user);
            });
    });
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'></div>
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
                                <PostsAdd />
                            </div>
                        </div>
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
                            <PostsAdd />
                        </div>
                        <div className='right'>
                            <Users
                                className='users'
                                author={author}
                                verseOne={''}
                                verseSecond={''}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default VerseAdd;
