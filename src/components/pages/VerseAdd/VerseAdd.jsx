import Navbar from '../../UI/Navbar/Navbar';
import '../Verse/Verse.scss';
import React, { useState } from 'react';
import Users from '../../UI/Users/Users';
import useResizer from '../../../utils/utils';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import PostsAdd from '../../UI/PostsAdd/PostsAdd';
import Search from '../../UI/Search/Search';
import ProfileHeader from '../../UI/ProfileHeader/ProfileHeader';

const VerseAdd = (props) => {
    const isMobile = useResizer();
    const [active, setActive] = useState(false);
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'>
                    <div className='infiniteMobile'>
                        <div className='verseHeaderMobileBlock'>
                            <ProfileHeader author={props.author} />
                        </div>
                        <div className='verseAddMobileBlock'>
                            {props.author === props.current && <PostsAdd />}
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
                    <div className='verse-page-small'>
                        <Navbar
                            className='navBar'
                            active={active}
                            setActive={setActive}
                            current={props.current}
                        />
                        <div className='verse-blockAddSmall'>
                            {props.author === props.current && <PostsAdd />}
                        </div>
                        <div className='right-small'>
                            <Search />
                            <Users
                                className='users'
                                author={props.author}
                                cat={props.cat}
                                current={props.current}
                            />
                        </div>
                    </div>
                </>
            );
        }
        if (!active) {
            return (
                <>
                    <div className='verse-page'>
                        <Navbar
                            className='navBar'
                            active={active}
                            setActive={setActive}
                            current={props.current}
                        />
                        <div className='verse-blockAdd'>
                            {props.author === props.current && <PostsAdd />}
                        </div>
                        <div className='right'>
                            <Search />
                            <Users
                                className='users'
                                author={props.author}
                                cat={props.cat}
                                current={props.current}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default VerseAdd;
