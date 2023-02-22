import React, { useState } from 'react';
import useResizer from '../../../utils/utils';
import HeaderMobile from '../../UI/HeaderMobile/HeaderMobile';
import NavbarMobile from '../../UI/NavbarMobile/NavbarMobile';
import Navbar from '../../UI/Navbar/Navbar';
import Users from '../../UI/Users/Users';
import './Settings.scss';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Settings = () => {
    const isMobile = useResizer();
    const [active, setActive] = useState(false);
    const { isAuthentificated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthentificated) {
            navigate('/');
        }
    }, [isAuthentificated, isAuthLoading]);
    if (isMobile) {
        return (
            <div className='mobile-verse'>
                <HeaderMobile />
                <div className='mobileMiddle'>
                    <div className='verseMobileBlock'>COMING SOON</div>
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
                            <div className='verse'> COMING SOON</div>
                        </div>
                        <div className='right-small'>
                            <Users
                                className='users'
                                author={'YYYYYYY'}
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
                        <div className='verse-block'>COMING SOON</div>

                        <div className='right'>
                            <Users
                                className='users'
                                author={'YYYYYYY'}
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

export default Settings;
