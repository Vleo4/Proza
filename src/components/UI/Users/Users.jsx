import './Users.scss';
import React, { useEffect, useState } from 'react';
import subscribe from '../../../assets/images/Users/subscribe.png';
import noSubscribe from '../../../assets/images/Users/noSubscribe.png';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { useAuthContext } from '../../../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import refactor from '../../../assets/images/Users/refactor.png';
import AlertRefactor from '../AlertRefactor/AlertRefactor';
import portrait from '../../../assets/images/portrait.svg';
import { getAchievements, getUserProfile, setSubscribeUser } from '../../../api/requests';
const Users = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const navigate = useNavigate();
    const [alert, toggleAlert] = useState(false);
    const toggleAlertFunc = () => {
        toggleAlert(!alert);
    };
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            setSubscribeUser(props.author);
            setIsSubscribe(!isSubscribe);
        } else {
            navigate('/login');
        }
    };
    const [subscribers, setSubscribers] = useState(0);
    const [follows, setFollows] = useState(0);
    const [description, setDescription] = useState('');
    const [jpg, setJpg] = useState(null);
    const [ico, setIco] = useState(null);
    const [user, setUser] = useState(false);
    useEffect(() => {
        async function fetchData() {
            if (props.author) {
                const data = await getUserProfile(props.author);
                data?.id && setUser(true);
                data?.photo && setJpg(data.photo);
                data?.description && setDescription(data.description);
                data?.subscribers && setSubscribers(data.subscribers.length);
                data?.follows && setFollows(data.follows.length);
                if (isAuthentificated && location.pathname !== '/profile' && data?.subscribers) {
                    const accessToken =
                        getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
                    const token = jwtDecode(accessToken);
                    setIsSubscribe(data.subscribers.includes(token.user_id));
                }
                if (data?.id) {
                    const achieve = await getAchievements(data.id);
                    achieve?.achieved[0] && setIco(achieve.achieved[0].ico);
                }
            }
        }
        fetchData();
    }, [props, isSubscribe]);
    if (user) {
        return (
            <>
                <AlertRefactor
                    toggleAlert={toggleAlertFunc}
                    cat={props.cat}
                    imageData={jpg ? jpg : portrait}
                    alert={alert}
                />
                <div className='user'>
                    <div className='header-user'>
                        <div className='avatar'>
                            {location.pathname !== '/profile' && props.author !== props.current ? (
                                <></>
                            ) : (
                                <img
                                    onClick={toggleAlertFunc}
                                    src={refactor}
                                    className='refactor'
                                />
                            )}
                            <img
                                className={
                                    location.pathname !== '/profile' &&
                                    props.author !== props.current
                                        ? 'avatarImage'
                                        : 'avatarImageProfile'
                                }
                                src={jpg ? jpg : portrait}
                                alt='avatar'
                            />
                            {location.pathname !== '/profile' && props.author !== props.current ? (
                                <img
                                    className='avatarStatus'
                                    src={isSubscribe ? subscribe : noSubscribe}
                                    onClick={onSubscribe}
                                    alt={'subscribe'}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='headerUser'>{props.author}</div>
                        <div className='info'>
                            <div className='part'>
                                <div className='leftSide'>Публікації</div>
                                <div className='rightSide'>
                                    {props.length ? props.length : 0}
                                    <div />
                                </div>
                                <div className='part'>
                                    <div className='leftSide'>Підписники</div>
                                    <div className='rightSide'>
                                        {subscribers} <div />
                                    </div>
                                </div>

                                <div className='part'>
                                    <div className='leftSide'>Підписки</div>
                                    <div className='rightSide'>
                                        {follows}
                                        <div />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {description && <div className='partDesc'>{description}</div>}
                    <div className='partTopUser'>{ico ? <img src={ico} /> : <></>}</div>
                </div>
            </>
        );
    } else {
        return <div className='header-user'>КОРИСТУВАЧА НЕ ІСНУЄ</div>;
    }
};

export default Users;
